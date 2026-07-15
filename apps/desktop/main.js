const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#120a07', // Deep chocolate background during initial load
    title: '巧克力海 (Chocolate Ocean) - 剪映 Fork',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });

  // Load the local HTML file we created
  mainWindow.loadFile(path.join(__dirname, '../web/public/index.html'));

  // Open DevTools for debugging (Optional)
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
