(() => {
  // node_modules/@vercel/analytics/dist/index.js
  var name = "@vercel/analytics";
  var version = "1.1.1";
  var initQueue = () => {
    if (window.va)
      return;
    window.va = function a(...params) {
      (window.vaq = window.vaq || []).push(params);
    };
  };
  function isBrowser() {
    return typeof window !== "undefined";
  }
  function detectEnvironment() {
    try {
      const env = "development";
      if (env === "development" || env === "test") {
        return "development";
      }
    } catch (e) {
    }
    return "production";
  }
  function setMode(mode = "auto") {
    if (mode === "auto") {
      window.vam = detectEnvironment();
      return;
    }
    window.vam = mode;
  }
  function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
  }
  function isDevelopment() {
    return getMode() === "development";
  }
  function inject(props = {
    debug: true
  }) {
    var _a;
    if (!isBrowser())
      return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
      (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = isDevelopment() ? "https://va.vercel-scripts.com/v1/script.debug.js" : "/_vercel/insights/script.js";
    if (document.head.querySelector(`script[src*="${src}"]`))
      return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.setAttribute("data-sdkn", name);
    script.setAttribute("data-sdkv", version);
    script.onerror = () => {
      const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
      console.log(
        `[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`
      );
    };
    if (isDevelopment() && props.debug === false) {
      script.setAttribute("data-debug", "false");
    }
    document.head.appendChild(script);
  }

  // main.js
  inject();
})();
