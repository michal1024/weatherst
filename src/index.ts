import { app, BrowserWindow } from 'electron';
import widgetServices from './widgets/services';
import * as dotenv from 'dotenv';
import path from 'path';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}


const isDebug = () => process.env.DEBUG == "true";

const createWindow = (): BrowserWindow => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 480,
    width: 800  ,
    frame: isDebug(),
    kiosk: !isDebug(),
    webPreferences: {
      contextIsolation: false,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  if (isDebug()) {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
};

const loadConfig = () => {
  const configLocation = process.env.HOME + '/.weatherst';
  const result = dotenv.config({path: configLocation, debug: isDebug()});
  if (result.error) {
    console.warn('Failed to load .env file');
  }
}

const init = () => {
  loadConfig();
  const servicesCleanup = widgetServices();
  app.on('window-all-closed', servicesCleanup);
  createWindow();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', init);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

