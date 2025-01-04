// preload.js
const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

// Require PersonManager (with correct path)
const personDB = require(path.join(__dirname, 'public', 'PersonManager.js'));

// Debug logs to ensure we can load it:
console.log("[PRELOAD] personDB:", personDB);

contextBridge.exposeInMainWorld("electronAPI", {
  // Example OS info
  homeDir: () => os.homedir(),
  osVersion: () => os.version(),
  arch: () => os.arch(),
});

contextBridge.exposeInMainWorld("ipcRenderer", {
  send: (channel, data) => ipcRenderer.send(channel, data),
  on: (channel, func) => {
    ipcRenderer.on(channel, (event, ...args) => func(...args));
  },
});

// Expose the DB functions
contextBridge.exposeInMainWorld("sqlite", {
  personDB,
});
