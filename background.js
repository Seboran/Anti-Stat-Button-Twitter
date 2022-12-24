let hidden = false;

const hidePage = `[aria-label^="View Tweet analytics"] {
  display: none;
}`

/*
 * Updates the browserAction icon to reflect whether the current page
 * is already bookmarked.
 */
function updateIcon() {
  browser.browserAction.setIcon({
    path: hidden ? {
      19: "icons/star-filled-19.png",
      38: "icons/star-filled-38.png"
    } : {
      19: "icons/star-empty-19.png",
      38: "icons/star-empty-38.png"
    },
  });
  browser.browserAction.setTitle({
    // Screen readers can see the title
    title: hidden ? 'Show' : 'Hide',
  }); 
}

/*
 * Add or remove the bookmark on the current page.
 */
function toggleHide() {
  if (hidden) {
    browser.tabs.insertCSS({ code: hidePage }).then(() => {})
  } else {
    browser.tabs.removeCSS({ code: hidePage }).then(() => {})
  }
  hidden = !hidden
}

browser.browserAction.onClicked.addListener(toggleHide);
