chrome.runtime.onInstalled.addListener(() => {
  // Crea il menu contestuale
  chrome.contextMenus.create({
    id: "save-link",
    title: "Save link",
    contexts: ["link"]
  });

  // Chiamata per "svegliare" il conteggio (l'header verrà aggiunto automaticamente dalla regola statica)
  fetch('https://flavortown.hackclub.com', {
    method: 'GET',
    headers: {
      'X-Flavortown-Ext-13414': 'true'   // opzionale, tanto la regola lo aggiunge comunque
    }
  }).catch(err => console.error("Errore fetch achievement:", err));
});

// Gestione click sul menu contestuale
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "save-link") {
    const url = info.linkUrl;
    const title = info.selectionText || "Link saved";
    chrome.storage.sync.get(['links'], (result) => {
      const links = result.links || [];
      if (!links.some(link => link.url === url)) {
        links.push({ url, title, date: new Date().toLocaleString() });
        chrome.storage.sync.set({ links });
      }
    });
  }
});