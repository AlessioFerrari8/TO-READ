chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-link",
    title: "Save link",
    contexts: ["link"]
  });

  console.log("Estensione installata. Invio fetch a Flavortown.");

  // Per essere sicuri che l'header venga inviato, usiamo mode 'cors'
  // e un catch per gestire eventuali errori di rete senza bloccare l'estensione.
  fetch('https://flavortown.hackclub.com/', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'X-Flavortown-Ext-13414': 'true'
    }
  })
  .then(response => {
    console.log("Fetch a Flavortown completato con status:", response.status);
  })
  .catch(err => {
    console.error("Errore durante il fetch a Flavortown:", err);
  });
});

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
