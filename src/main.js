import { app, BrowserWindow, ipcMain } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import { getGreeting } from "./greeting.js";
import { getWeather } from "./weather.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 520,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setMenuBarVisibility(false);
  win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

ipcMain.handle("get-greeting", () => {
  return getGreeting();
});

ipcMain.handle("get-weather", async (_event, city) => {
  return getWeather(city);
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  app.quit();
});
