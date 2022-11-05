const PageHandler = require('./PageHandler');
const playwright = require('playwright');
const {
  CHECK_RESPONSE_TIMEOUT,
  TASK_TIMEOUT,
  browserOptions,
  defaultUserAgent,
} = require('./../utils/constants');

class TaskManager {
  constructor() {
    this._tasks = new Map();
    this._runBrowser();
  }

  async runTask(id, opts) {
    const tasks = this._tasks;
    tasks.set(id.toString(), {});

    const ua =
      !opts.userAgent || opts.userAgent === ''
        ? defaultUserAgent
        : opts.userAgent;

    let context;
    if (opts.proxy) {
      context = await this._browser.newContext({
        userAgent: ua,
        proxy: opts.proxy,
      });
    } else {
      context = await this._browser.newContext({
        userAgent: ua,
      });
    }

    const page = await context.newPage();


    const hcaptcha = opts.hcaptcha || '';
    const pageHandler = new PageHandler(page, opts.url, ua, hcaptcha);

    function checkCookie() {
      if (pageHandler.isReady()) {
        clearInt();
        tasks.set(id.toString(), pageHandler.getCookies());
        context.close();
      }
    }

    const interval = setInterval(checkCookie, CHECK_RESPONSE_TIMEOUT);

    function clearInt() {
      clearInterval(interval);
    }

    // Task Timeout
    setTimeout(() => {
      if (!pageHandler.isReady()) {
        clearInt();
        tasks.set(id.toString(), { error: 'timeout' });
        context.close();
      }
    }, TASK_TIMEOUT);
  }

  getTask(id) {
    const task = this._tasks.get(id.toString());
    if (task) {
      return {
        ...task,
        time: ((new Date().getTime() - id) / 1000).toFixed(2),
      };
    }
    return {
      not_found: 'not_found',
    };
  }

  deleteTask(id) {
    this._tasks.delete(id);
  }

  async _runBrowser() {
    this._browser = await playwright['chromium'].launch(browserOptions);
  }
}

const taskManager = new TaskManager();
module.exports = taskManager;
