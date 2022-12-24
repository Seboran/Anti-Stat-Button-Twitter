const hidePage = `[aria-label^="View Tweet analytics"] {
  display: none;
}`

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener('click', (e) => {
    /**
     * Insert the page-hiding CSS into the active tab,
     */
    function hide() {
      browser.tabs.insertCSS({ code: hidePage }).then(() => {})
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     */
    function show() {
      browser.tabs.removeCSS({ code: hidePage }).then(() => {})
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not hide: ${error}`)
    }

    /**
     * Get the active tab,
     */
    if (e.target.type === 'reset') {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(show)
        .catch(reportError)
    } else {
      browser.tabs
        .query({ active: true, currentWindow: true })
        .then(hide)
        .catch(reportError)
    }
  })
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector('#popup-content').classList.add('hidden')
  document.querySelector('#error-content').classList.remove('hidden')
  console.error(
    `Failed to execute antistat twitter content script: ${error.message}`,
  )
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
  .executeScript({ file: '/content_scripts/hideTwitterStats.js' })
  .then(listenForClicks)
  .catch(reportExecuteScriptError)
