/* ============================================================
   Portfolio OS - Lightweight front-end i18n
   ============================================================ */
(function () {
  const lang = "en";

  function t(key, fallback) {
    return fallback || key;
  }

  document.documentElement.lang = "en";
  window.JP_LANG = lang;
  window.JP_I18N = {
    lang,
    t,
  };
})();
