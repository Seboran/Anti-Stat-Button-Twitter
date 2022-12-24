(() => {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  const hidePage = `[aria-label^="View Tweet analytics"] {
    display: none;
  }`

  /**
   * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function hide() {
    const hideCss = document.createElement("style");
    hideCss.className = "hide-twitter-analytics";
    hideCss.textContent = hidePage;
    document.head.appendChild(hideCss);
  }

  /**
   * Remove every beast from the page.
   */
  function show() {
    const cssInjected = document.querySelectorAll(".hide-twitter-analytics")
    for (const cssInjectItem of cssInjected) {
      cssInjectItem.remove();
    }
  }



  /**
   * Listen for messages from the background script.
   * Call "insertBeast()" or "removeExistingBeasts()".
   */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "hide") {
      hide();
    } else if (message.command === "show") {
      show();
    }
  });
})();
