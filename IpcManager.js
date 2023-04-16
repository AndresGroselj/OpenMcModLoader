const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const Downloader = require("./Downloader")
const Installer = require("./Installer")
const Progress = require("./Progress")

ipcMain.on("install", async (event, installPath, packid) => {
	console.log(`installing mods in ${installPath}` )

	progress = Progress.getInstance();
	progress.value = 0;
	progress.max = 24600318; //TODO: do this automatically

	await Installer.download(packid);
	//Installer.copyMods(installPath)
	//Installer.copyVersion(installPath)
	//Installer.installProfile(installPath)
})

ipcMain.handle("searchDir", async (event, currentPath) => {
	console.log("searching directory")
	win = BrowserWindow.getFocusedWindow()
	var result;
	await dialog.showOpenDialog(win, {
		properties: ['openDirectory'],
		defaultPath: currentPath
	  }).then(res => {
		result = res
	}).catch(err => {
		console.log(err)
	})
	return [result.canceled, result.filePaths]
})

ipcMain.handle("getPackList", async (event) => {
    return await Downloader.listDirectory("1LCoCV4HuCVPMWTTEq7SHqmzFT1FLcJX6");
})

ipcMain.handle("getProgress", (event) => {
    return Progress.getInstance()
})