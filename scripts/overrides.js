Object.defineProperty(Navigator.prototype, 'webdriver', {
  get() {
    return false;
  },
});

(function () {
  window.chrome = {};
  window.chrome.app = {
    InstallState: {
      DISABLED: 'disabled',
      INSTALLED: 'installed',
      NOT_INSTALLED: 'not_installed',
    },
    RunningState: {
      CANNOT_RUN: 'cannot_run',
      READY_TO_RUN: 'ready_to_run',
      RUNNING: 'running',
    },
    getDetails: () => {
      '[native code]';
    },
    getIsInstalled: () => {
      '[native code]';
    },
    installState: () => {
      '[native code]';
    },
    get isInstalled() {
      return false;
    },
    runningState: () => {
      '[native code]';
    },
  };

  window.chrome.runtime = {
    OnInstalledReason: {
      CHROME_UPDATE: 'chrome_update',
      INSTALL: 'install',
      SHARED_MODULE_UPDATE: 'shared_module_update',
      UPDATE: 'update',
    },
    OnRestartRequiredReason: {
      APP_UPDATE: 'app_update',
      OS_UPDATE: 'os_update',
      PERIODIC: 'periodic',
    },
    PlatformArch: {
      ARM: 'arm',
      ARM64: 'arm64',
      MIPS: 'mips',
      MIPS64: 'mips64',
      X86_32: 'x86-32',
      X86_64: 'x86-64',
    },
    PlatformNaclArch: {
      ARM: 'arm',
      MIPS: 'mips',
      MIPS64: 'mips64',
      X86_32: 'x86-32',
      X86_64: 'x86-64',
    },
    PlatformOs: {
      ANDROID: 'android',
      CROS: 'cros',
      FUCHSIA: 'fuchsia',
      LINUX: 'linux',
      MAC: 'mac',
      OPENBSD: 'openbsd',
      WIN: 'win',
    },
    RequestUpdateCheckStatus: {
      NO_UPDATE: 'no_update',
      THROTTLED: 'throttled',
      UPDATE_AVAILABLE: 'update_available',
    },
    connect() {
      '[native code]';
    },
    sendMessage() {
      '[native code]';
    },
    id: undefined,
  };

  let startE = Date.now();
  window.chrome.csi = function () {
    '[native code]';
    return {
      startE: startE,
      onloadT: startE + 281,
      pageT: 3947.235,
      tran: 15,
    };
  };

  window.chrome.loadTimes = function () {
    '[native code]';
    return {
      get requestTime() {
        return startE / 1000;
      },
      get startLoadTime() {
        return startE / 1000;
      },
      get commitLoadTime() {
        return startE / 1000 + 0.324;
      },
      get finishDocumentLoadTime() {
        return startE / 1000 + 0.498;
      },
      get finishLoadTime() {
        return startE / 1000 + 0.534;
      },
      get firstPaintTime() {
        return startE / 1000 + 0.437;
      },
      get firstPaintAfterLoadTime() {
        return 0;
      },
      get navigationType() {
        return 'Other';
      },
      get wasFetchedViaSpdy() {
        return true;
      },
      get wasNpnNegotiated() {
        return true;
      },
      get npnNegotiatedProtocol() {
        return 'h3';
      },
      get wasAlternateProtocolAvailable() {
        return false;
      },
      get connectionInfo() {
        return 'h3';
      },
    };
  };
})();

(function () {
  const plugin0 = Object.create(Plugin.prototype);

  const mimeType0 = Object.create(MimeType.prototype);
  const mimeType1 = Object.create(MimeType.prototype);
  Object.defineProperties(mimeType0, {
    type: {
      get: () => 'application/pdf',
    },
    suffixes: {
      get: () => 'pdf',
    },
  });

  Object.defineProperties(mimeType1, {
    type: {
      get: () => 'text/pdf',
    },
    suffixes: {
      get: () => 'pdf',
    },
  });

  Object.defineProperties(plugin0, {
    name: {
      get: () => 'Chrome PDF Viewer',
    },
    description: {
      get: () => 'Portable Document Format',
    },
    0: {
      get: () => {
        return mimeType0;
      },
    },
    1: {
      get: () => {
        return mimeType1;
      },
    },
    length: {
      get: () => 2,
    },
    filename: {
      get: () => 'internal-pdf-viewer',
    },
  });

  const plugin1 = Object.create(Plugin.prototype);
  Object.defineProperties(plugin1, {
    name: {
      get: () => 'Chromium PDF Viewer',
    },
    description: {
      get: () => 'Portable Document Format',
    },
    0: {
      get: () => {
        return mimeType0;
      },
    },
    1: {
      get: () => {
        return mimeType1;
      },
    },
    length: {
      get: () => 2,
    },
    filename: {
      get: () => 'internal-pdf-viewer',
    },
  });

  const plugin2 = Object.create(Plugin.prototype);
  Object.defineProperties(plugin2, {
    name: {
      get: () => 'Microsoft Edge PDF Viewer',
    },
    description: {
      get: () => 'Portable Document Format',
    },
    0: {
      get: () => {
        return mimeType0;
      },
    },
    1: {
      get: () => {
        return mimeType1;
      },
    },
    length: {
      get: () => 2,
    },
    filename: {
      get: () => 'internal-pdf-viewer',
    },
  });

  const plugin3 = Object.create(Plugin.prototype);
  Object.defineProperties(plugin3, {
    name: {
      get: () => 'PDF Viewer',
    },
    description: {
      get: () => 'Portable Document Format',
    },
    0: {
      get: () => {
        return mimeType0;
      },
    },
    1: {
      get: () => {
        return mimeType1;
      },
    },
    length: {
      get: () => 2,
    },
    filename: {
      get: () => 'internal-pdf-viewer',
    },
  });

  const plugin4 = Object.create(Plugin.prototype);
  Object.defineProperties(plugin4, {
    name: {
      get: () => 'WebKit built-in PDF',
    },
    description: {
      get: () => 'Portable Document Format',
    },
    0: {
      get: () => {
        return mimeType0;
      },
    },
    1: {
      get: () => {
        return mimeType1;
      },
    },
    length: {
      get: () => 2,
    },
    filename: {
      get: () => 'internal-pdf-viewer',
    },
  });

  const pluginArray = Object.create(PluginArray.prototype);

  pluginArray['0'] = plugin0;
  pluginArray['1'] = plugin1;
  pluginArray['2'] = plugin2;
  pluginArray['3'] = plugin3;
  pluginArray['4'] = plugin4;

  let refreshValue;

  Object.defineProperties(pluginArray, {
    length: {
      get: () => 5,
    },
    item: {
      value: (index) => {
        if (index > 4294967295) {
          index = index % 4294967296;
        }
        switch (index) {
          case 0:
            return plugin3;
          case 1:
            return plugin0;
          case 2:
            return plugin1;
          case 3:
            return plugin2;
          case 4:
            return plugin4;
          default:
            break;
        }
      },
    },
    refresh: {
      get: () => {
        return refreshValue;
      },
      set: (value) => {
        refreshValue = value;
      },
    },
    namedItem: {
      value: function namedItem(name) {
        '{ [native code] }';
        switch (name) {
          case 'PDF Viewer':
            return plugin3;
          case 'Chrome PDF Viewer':
            return plugin0;
          case 'Chromium PDF Viewer':
            return plugin1;
          case 'Microsoft Edge PDF Viewer':
            return plugin2;
          case 'WebKit built-in PDF':
            return plugin4;
          default:
            return undefined;
        }
      },
    },
  });

  Object.defineProperty(Object.getPrototypeOf(navigator), 'plugins', {
    get: () => {
      '[native code]';
      return pluginArray;
    },
  });
  
  Object.getOwnPropertyDescriptor(
    Object.getPrototypeOf(navigator),
    'plugins'
  ).get.toString = function toString() {
    return 'function get plugins() { [native code] }';
  };
})();

// Bypass OOPIF test
(function performance_memory() {
  const jsHeapSizeLimitInt = 4294705152;

  const total_js_heap_size = 35244183;
  const used_js_heap_size = [
    17632315, 17632315, 17632315, 17634847, 17636091, 17636751,
  ];

  let counter = 0;

  let MemoryInfoProto = Object.getPrototypeOf(performance.memory);
  Object.defineProperties(MemoryInfoProto, {
    jsHeapSizeLimit: {
      get: () => {
        return jsHeapSizeLimitInt;
      },
    },
    totalJSHeapSize: {
      get: () => {
        return total_js_heap_size;
      },
    },
    usedJSHeapSize: {
      get: () => {
        if (counter > 5) {
          counter = 0;
        }
        return used_js_heap_size[counter++];
      },
    },
  });
})();
