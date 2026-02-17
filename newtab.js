function renderLinks() {
  chrome.storage.local.get(['links'], (result) => {
    const links = result.links || [];
    const list = document.getElementById('link-list');
    list.innerHTML = '';
    if (links.length === 0) {
      list.innerHTML = '<li>No links. Try the extension to add some.</li>';
      return;
    }

    // list of links
    links.forEach((link, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${link.url}" target="_blank">${link.title}</a>
        <span class="date">${link.date}</span>
        <button class="delete" data-index="${index}">❌</button>
      `;
      list.appendChild(li);
    });

    // button delete
    document.querySelectorAll('.delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        links.splice(index, 1);
        chrome.storage.local.set({ links }, renderLinks);
      });
    });
  });
}

document.getElementById('clear').addEventListener('click', () => {
  if (confirm('Clear all links?')) {
    chrome.storage.local.set({ links: [] }, renderLinks);
  }
});

renderLinks();