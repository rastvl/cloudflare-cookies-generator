const { gotScraping } = require('got-scraping');

class RucaptchaSolver {
  constructor(api_key, sitekey, url) {
    this._apikey = api_key;
    this._sitekey = sitekey;
    this._url = url;

    this._taskId = '';
    this._answer = '';
  }

  solve() {
    this._sendHcaptchaTask();
    const solverCtx = this;
    return new Promise((rs, rj) => {
      const checkResInterval = setInterval(() => {
        solverCtx._checkTask();
        if (solverCtx._answer !== '') {
          if (solverCtx._answer.includes('OK|')) {
            clearCheckInterval();
            rs(solverCtx._answer.split('|')[1]);
          } else if (!solverCtx._answer.includes('CAPCHA_NOT_READY')) {
            clearCheckInterval();
            rj(solverCtx._answer);
          }
        }
      }, 3000);

      function clearCheckInterval() {
        clearInterval(checkResInterval);
      }
    });
  }

  _sendHcaptchaTask() {
    gotScraping
      .get(
        `http://rucaptcha.com/in.php?key=${this._apikey}&sitekey=${this._sitekey}&pageurl=${this._url}&method=hcaptcha`
      )
      .then((res) => {
        const { body } = res;
        if (body.includes('OK|')) {
          this._taskId = body.split('|')[1];
        } else {
          throw Error('RucaptchaError: ' + body);
        }
      })
      .catch((err) => {
        throw Error('Unknown Rucaptcha Error: ' + err.message);
      });
  }

  _checkTask() {
    gotScraping
      .get(
        `http://rucaptcha.com/res.php?key=${this._apikey}&id=${this._taskId}&action=get`
      )
      .then((res) => {
        this._answer = res.body;
        if (res.body.includes('OK|')) {
          this._answer = res.body;
        } else {
        }
      });
  }
}

module.exports = RucaptchaSolver;
