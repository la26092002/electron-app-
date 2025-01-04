// main.js
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createMainWindow() {
  // Set environment for production (if needed)
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

  const mainWindow = new BrowserWindow({
    title: 'Electron',
    width: 1000,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
        // Turn off sandbox so preload can use require('path'):
        sandbox: false
    },
  });

  // In production, do NOT open dev tools automatically
  // mainWindow.webContents.openDevTools();

  // Load the production build of your React app
  mainWindow.loadFile(path.join(__dirname, '..','Frontend', 'build', 'index.html'));
}

app.whenReady().then(createMainWindow);

// Example IPC listener
ipcMain.on('submit:todoForm', (event, data) => {
  console.log("Received from renderer:", data);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
