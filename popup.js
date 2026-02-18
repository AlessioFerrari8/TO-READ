// Render links from storage
function renderLinks() {
  chrome.storage.local.get(['links'], (result) => {
    const links = result.links || [];
    const list = document.getElementById('link-list');
    list.innerHTML = '';
    
    if (links.length === 0) {
      list.innerHTML = '<li class="empty-message">No links yet. Save some to get started!</li>';
      return;
    }

    // Display all links
    links.forEach((link, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${link.url}" target="_blank">${link.title}</a>
        <span class="date">${link.date}</span>
        <button class="delete" data-index="${index}">❌</button>
      `;
      list.appendChild(li);
    });

    // Delete link button
    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        links.splice(index, 1);
        chrome.storage.local.set({ links }, renderLinks);
      });
    });
  });
}

// Save current page
document.getElementById('save').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab.url;
  const title = tab.title || "No title";

  chrome.storage.local.get(['links'], (result) => {
    const links = result.links || [];
    
    if (!links.some(link => link.url === url)) {
      links.push({ url, title, date: new Date().toLocaleString() });
      chrome.storage.local.set({ links }, () => {
        document.getElementById('status').innerText = '✓ Saved!';
        renderLinks();
        setTimeout(() => {
          document.getElementById('status').innerText = '';
        }, 2000);
      });
    } else {
      document.getElementById('status').innerText = '⚠ Already saved';
      setTimeout(() => {
        document.getElementById('status').innerText = '';
      }, 2000);
    }
  });
});

// Clear all links
document.getElementById('clear').addEventListener('click', () => {
  if (confirm('Delete all links?')) {
    chrome.storage.local.set({ links: [] }, renderLinks);
  }
});

// Initial render
renderLinks();
