document.getElementById('save').addEventListener('click', async () => {
    // tab + url 
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
    const title = tab.title || "No title";

    // current list
    chrome.storage.local.get(['links'], (result) => {
        const links = result.links || []; // all links
        
        // to avoid duplicates
        if (!links.some(link => link.url === url)) {
        // add
        links.push({ url, title, date: new Date().toLocaleString() });

        // ack to user
        chrome.storage.local.set({ links }, () => {
            document.getElementById('status').innerText = 'Saved!'; 
            setTimeout(() => window.close(), 1000);
        });
        } else {
        document.getElementById('status').innerText = 'Already there';
        setTimeout(() => window.close(), 800);
        }
    });
});
