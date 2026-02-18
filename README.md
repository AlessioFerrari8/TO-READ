# ![Logo](favicon.png) TO-READ - Browser Extension

A simple browser extension to save links and web pages for later reading. A lightweight alternative to bookmarks.

![Main popup](https://github.com/user-attachments/assets/5229b869-cc77-4e64-b43c-76e4e4a39e58)

## Features ⚙️

- **Quick save** – With one click on "Save this page", the current tab is added to your list.
- **Organized list** – View all saved links with title, URL, and timestamp.
- **Selective deletion** – Remove individual links by pressing the ❌ button next to them.
- **Clear everything** – Delete all links at once with "Clear everything".
- **Persistent storage** – Links are stored locally in your browser and remain even after closing the popup.

After saving some links, the popup will look like this:

![Saved links list](https://github.com/user-attachments/assets/f7bc2a4d-95e1-419a-a0d6-c27dc1bc8ebb)

## Installation ⬇️

1. Clone this repository:
   ```
   git clone https://github.com/AlessioFerrari8/TO-READ.git
   ```
3. Open your browser and go to the extensions page:
- `chrome://extensions` (for Chrome, Edge, Brave, or any Chromium-based browser)
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the project folder (where `manifest.json` is located).
5. The extension will appear in your list. Pin the icon for quick access.

## Usage 👇🏽

- Click the extension icon to open the popup.
- Press **Save this page** to save the current tab.
- To delete a link, click ❌ next to it.
- To remove all links, press **Clear everything** at the bottom.


## Technologies Used 🖥️

- Manifest V3
- HTML, CSS, JavaScript
- Chrome Storage API (or `localStorage`) for data persistence

## Customization

You can modify the popup appearance by editing `popup.html` and any CSS file. The saving logic is in `popup.js`.

Made by Ferro_32 with ❤️
