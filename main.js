import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm"

const supabaseUrl = "https://hivxamfcuntyviilmkdl.supabase.co"
const supabaseKey = "sb_publishable_WvgO-imEBepPVdpe0DxRuA_OnP7PUgp"

const supabase = createClient(supabaseUrl, supabaseKey)









const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "memo.txt");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("load-memos", async () => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf8");
  return data.split("\n").filter(line => line.trim() !== "");
});

ipcMain.handle("save-memo", async (event, memo) => {
  fs.appendFileSync(filePath, memo + "\n");
});

ipcMain.handle("delete-memo", async (event, index) => {
  if (!fs.existsSync(filePath)) return;

  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").filter(line => line.trim() !== "");

  lines.splice(index, 1);

  fs.writeFileSync(filePath, lines.join("\n") + "\n");
});