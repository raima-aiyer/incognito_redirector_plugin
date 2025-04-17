# Incognito Redirector Chrome Extension

A Chrome extension that automatically redirects specified websites to open in incognito mode.

## Features

- Automatically opens specified websites in incognito mode
- Easy-to-use interface for managing website list
- Supports wildcards (e.g., adding "example.com" will match "www.example.com" and "sub.example.com")
- Clean and modern UI
- Syncs website list across devices using Chrome sync

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Click the extension icon in your Chrome toolbar
2. Enter a website domain (e.g., "example.com") in the input field
3. Click "Add Website" or press Enter
4. The website will be added to your redirect list
5. Any future visits to the specified websites will automatically open in incognito mode

## Notes

- You don't need to include "http://" or "https://" when adding websites
- The extension will match subdomains of the websites you add
- Website list is synced across your Chrome browsers when you're signed in
- The extension requires the following permissions:
  - "storage": To save your website list
  - "tabs": To manage tabs and windows
  - "webNavigation": To detect when you visit websites

## Privacy

- Your website list is only stored in Chrome's sync storage
- No data is collected or sent to external servers
- The extension only redirects the websites you specify

## License

MIT License - feel free to modify and use this code as you wish! 