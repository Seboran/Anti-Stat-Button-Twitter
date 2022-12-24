function reportExecuteScriptError(error) {
  console.error(`Failed to execute beastify content script: ${error}`)
}

let hiddenToggle = false

function toggleHide(tabs) {
  browser.tabs.sendMessage(tabs[0].id, {
    command: hiddenToggle ? 'show' : 'hide',
  })
  hiddenToggle = !hiddenToggle
}

const filterUrls = { urls: ['*://twitter.com/*'] }

browser.browserAction.onClicked.addListener(() =>
  browser.tabs.query({ currentWindow: true, active: true }).then(toggleHide),
)

// browser.tabs.onCreated.addListener(() =>
//   browser.tabs.query({ currentWindow: true, active: true }).then(toggleHide),
// )

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status == 'complete') {
    setTimeout(
      browser.tabs
        .query({ currentWindow: true, active: true })
        .then(toggleHide),
    )
  }
}, filterUrls)
