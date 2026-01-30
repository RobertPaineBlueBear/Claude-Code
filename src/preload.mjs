import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("briefingAPI", {
  getGreeting: () => ipcRenderer.invoke("get-greeting"),
  getWeather: (city) => ipcRenderer.invoke("get-weather", city),
});
