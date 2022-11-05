const {
  STATUS_NOT_READY,
  STATUS_OK,
  HCAPTCHA_MODE,
  CLOUDFLARE_MODE,
  NO_CAPTCHA_MODE,
  CHECK_CAPCHA_TIMEOUT,
  rucaptcha_apikey,
  capmonser_apikey,
  hcaptcha_sitekey,
  CAPTCHA_SOLVER_RUCAPTCHA,
  CAPTCHA_SOLVER_CAPMONSTER,
  CAPTCHA_METHOD
} = require('./../utils/constants');
const RucaptchaSolver = require('./RucaptchaSolver');
const { CapMonsterCloudClientFactory, ClientOptions, HCaptchaProxylessRequest } = require('@zennolab_com/capmonstercloud-client');

class PageHandler {
  constructor(page, url, userAgent, hcaptcha) {
    this._page = page;
    this._captchaMode = NO_CAPTCHA_MODE;
    this._url = url;
    this._ua = userAgent;
    this._cookies = '';
    this._status = STATUS_NOT_READY;
    this._hcaptcha = hcaptcha;

    this._setRequestsInterceptor();
    this._goToUrl();
  }

  _setRequestsInterceptor() {
    this._page.on('response', async (response) => {
      const headers = await response.allHeaders();
      if (
        headers['set-cookie'] &&
        headers['set-cookie'].includes('cf_clearance')
      ) {
        console.log(headers['set-cookie']);
        this._cookies = headers['set-cookie'];
        this._status = STATUS_OK;
      }
    });

    this._page.on('request', async (request) => {
      if (request.url().includes('hcaptcha.html')) {
        this._captchaMode = HCAPTCHA_MODE;
        this._page.removeAllListeners('request');
        return;
      } else if (request.url().includes('challenges.cloudflare.com')) {
        this._captchaMode = CLOUDFLARE_MODE;
        this._page.removeAllListeners('request');
        return;
      }

    });
  }

  async _goToUrl() {
    const pageCtx = this;
    await this._page.addInitScript({ path: './scripts/hc-interceptor.js' });
    await this._page.addInitScript({ path: './scripts/overrides.js' });

    await this._page.goto(this._url);

    const checkCaptchaInterval = setInterval(
      checkCaptchaMode,
      CHECK_CAPCHA_TIMEOUT
    );

    function checkCaptchaMode() {
      if (pageCtx._captchaMode !== NO_CAPTCHA_MODE) {
        clearInterval(checkCaptchaInterval);

        switch (pageCtx._captchaMode) {
          case HCAPTCHA_MODE:
            if (CAPTCHA_METHOD === CAPTCHA_SOLVER_RUCAPTCHA) {
              pageCtx._solveHcaptchaViaRucaptcha();
            } else {
              pageCtx._solveHcaptchaViaCapmonster();
            }
            break;
          case CLOUDFLARE_MODE:
            pageCtx._solveCloudflareChallenge();
            break;
          default:
            throw Error('Unknown captcha mode');
        }
      }
    }
  }

  isReady() {
    return this._status != STATUS_NOT_READY;
  }

  getCookies() {
    return {
      status: this._status,
      cookies: this._cookies,
    };
  }

  getStatus() {
    return this._status;
  }

  _submitHcaptcha(token) {
    this._page.evaluate(`
      const callBackName = [];
      Object.keys(window).forEach(key => {
          if (key.includes('hcaptchaCallback')) {
              callBackName.push(key)
          }
      });
      window[callBackName[1]]('${token}')
    `);
  }

  async _solveHcaptchaViaRucaptcha() {
    console.log('HCAPTCHA SOLVER RUCAPTCHA');
    if (this._hcaptcha === '') {
      const hcaptchaTask = new RucaptchaSolver(
        rucaptcha_apikey,
        hcaptcha_sitekey,
        this._url
      );
      const thisCtx = this;
      hcaptchaTask
        .solve()
        .then((res) => {
          thisCtx._submitHcaptcha(res);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await this._page
        .frameLocator('iframe >> nth=1')
        .locator("xpath=//div[@id='checkbox']")
        .waitFor();
      this._submitHcaptcha(this._hcaptcha);
    }
  }

  async _solveHcaptchaViaCapmonster() {
    console.log('HCAPTCHA SOLVER CAPMONSTER');

    if (this._hcaptcha === '') {
      const cmcClient = CapMonsterCloudClientFactory.Create(new ClientOptions({ clientKey: capmonser_apikey }));

      const hcaptchaProxylessRequest = new HCaptchaProxylessRequest({
        websiteURL: this._url,
        websiteKey: hcaptcha_sitekey,
      });

      cmcClient.Solve(hcaptchaProxylessRequest)
        .then(res => {
          this._submitHcaptcha(res.solution.gRecaptchaResponse);
        })
        .catch(err => {
          throw Error(`Capmonster Cloud Error: ${err.message}`)
        })

    } else {
      await this._page
        .frameLocator('iframe >> nth=1')
        .locator("xpath=//div[@id='checkbox']")
        .waitFor();
      this._submitHcaptcha(this._hcaptcha);
    }
  }

  async _solveCloudflareChallenge() {
    console.log('CLOUDFLARE SOLVER');
    // If the captcha is not automatically solved, then do not waste your time on it
  }
}

module.exports = PageHandler;
