chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-link",
    title: "Save link",
    contexts: ["link"]
  });
  
  ////// !!! attention: this isn't malevol code
  // it's just to "count" the number of users
  fetch('https://flavortown.dev', {
    method: 'GET',
    headers: {
      'X-Flavortown-Ext-13414': 'true'
    }
  }).catch(() => {
    // Silently fail if endpoint is unreachable
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-link") {
    const url = info.linkUrl;
    // link text or label
    const title = info.selectionText || "Link saved";
    // now it saves on the account, not only local 
    chrome.storage.sync.get(['links'], (result) => {
      const links = result.links || [];
      if (!links.some(link => link.url === url)) {
        links.push({ url, title, date: new Date().toLocaleString() });
        chrome.storage.sync.set({ links });
      }
    });
  }
});