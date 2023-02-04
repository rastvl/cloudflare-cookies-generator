const STATUS_NOT_READY = Symbol('not_ready');
const STATUS_OK = Symbol('status_ok');
const STATUS_ERROR = Symbol('STATUS ERROR');

const HCAPTCHA_MODE = Symbol('hcaptcha');
const CLOUDFLARE_MODE = Symbol('cloudflare');
const NO_CAPTCHA_MODE = Symbol('no_captcha');

// ms
const CHECK_RESPONSE_TIMEOUT = 200;
const CHECK_CAPCHA_TIMEOUT = 500;
const TASK_TIMEOUT = 60000; // If it was not possible to get a cookie during this time, task terminates

const defaultUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.120 Safari/537.36';

// CAPTCHA-SOLVER METHOD(rucaptcha/capmonster cloud)
const CAPTCHA_SOLVER_RUCAPTCHA = Symbol('rucaptcha_method');
const CAPTCHA_SOLVER_CAPMONSTER = Symbol('capmonster_method');

const CAPTCHA_METHOD = CAPTCHA_SOLVER_CAPMONSTER;
// Rucaptcha
const rucaptcha_apikey = '';
// Capmonster
const capmonser_apikey = '';

const hcaptcha_sitekey = '';

const browserOptions = {
  ignoreHTTPSErrors: true,
  args: [
    '--lang=en-US,en;q=0.9',
    '--disable-sync',
    '--disable-features=IsolateOrigins,site-per-process',
  ],
  defaultViewport: {
    width: 1920,
    height: 1080,
  },
  headless: false,
  proxy: { server: 'per-context' }
};

module.exports = {
  STATUS_NOT_READY,
  STATUS_OK,
  STATUS_ERROR,
  CHECK_RESPONSE_TIMEOUT,
  CHECK_CAPCHA_TIMEOUT,
  TASK_TIMEOUT,
  HCAPTCHA_MODE,
  CLOUDFLARE_MODE,
  NO_CAPTCHA_MODE,
  CAPTCHA_SOLVER_RUCAPTCHA,
  CAPTCHA_SOLVER_CAPMONSTER,
  CAPTCHA_METHOD,
  defaultUserAgent,
  rucaptcha_apikey,
  hcaptcha_sitekey,
  capmonser_apikey,
  browserOptions
}