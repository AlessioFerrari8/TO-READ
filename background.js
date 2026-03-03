chrome.runtime.onInstalled.addListener(() => {
  // Crea il menu contestuale
  chrome.contextMenus.create({
    id: "save-link",
    title: "Save link",
    contexts: ["link"]
  });

  // Aggiungi la regola DNR
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],          // rimuovi eventuale regola precedente con stesso ID
    addRules: [{
      id: 1,
      priority: 1,
      action: {
        type: "modifyHeaders",
        requestHeaders: [{
          header: "X-Flavortown-Ext-13414",
          operation: "set",
          value: "true"
        }]
      },
      condition: {
        requestDomains: ["flavortown.hackclub.com"],
        resourceTypes: ["main_frame", "sub_frame", "xmlhttprequest", "other"]
      }
    }]
  }).catch(err => console.error('Errore installazione regola DNR:', err));

  // Facoltativo: esegui subito una fetch per sicurezza
  fetch('https://flavortown.hackclub.com', {
    method: 'GET',
    headers: { 'X-Flavortown-Ext-13414': 'true' }
  }).catch(() => {});
});  
  ////// !!! attention: this isn't malevol code
  // it's just to "count" the number of users
fetch('https://flavortown.hackclub.com', {
  method: 'GET',
  headers: { 
    'X-Flavortown-Ext-13414': 'true'
  }
}).catch(err => console.error('Errore fetch achievement:', err));

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