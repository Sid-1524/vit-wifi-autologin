# VIT WiFi Auto Login

A lightweight Chrome extension that auto-fills VIT/Pronto WiFi login credentials on the captive portal page and can optionally submit the form automatically.

## Features

- Saves your VIT WiFi username and password in browser storage
- Automatically fills the login form when the captive portal appears
- Optional auto-submit after filling in the form
- Simple popup UI for enabling/disabling the feature and clearing saved credentials

## How it works

The extension watches for the VIT captive portal URL and injects a content script when the login page loads. It then:

1. Reads the saved username and password from Chrome storage
2. Finds the username/password fields on the portal page
3. Fills them programmatically
4. Optionally clicks the login button or submits the form automatically

## Installation

1. Open Google Chrome or Microsoft Edge.
2. Go to `chrome://extensions` (or `edge://extensions`).
3. Enable Developer Mode.
4. Click Load unpacked.
5. Select this project folder.
6. The extension should appear in your toolbar.

## Usage

1. Click the extension icon.
2. Enter your WiFi username and password.
3. Toggle Enable auto-fill if you want the extension to work automatically.
4. Optionally enable Auto-submit.
5. Click Save.

When the VIT captive portal page loads, the extension will attempt to fill the fields automatically.

## Notes

- The extension is designed to match the VIT/Pronto captive portal login page.
- Credentials are stored locally in Chrome storage using the browser's extension storage API.
- The auto-submit feature is intentionally limited to avoid repeated attempts in case the portal gets stuck.

## Files

- `manifest.json` — browser extension configuration
- `content.js` — login automation logic injected onto the portal page
- `popup.html` — extension popup UI
- `popup.js` — saves and clears credentials from storage

## Disclaimer

This project is intended for personal use on the university WiFi login portal. Use it responsibly and only in accordance with your institution's network policies.
