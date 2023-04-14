const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const Downloader = require("./Downloader")
const Installer = require("./Installer")

ipcMain.on("install", (event, installPath) => {
	console.log(`installing mods in ${installPath}` )

	Installer.copyMods(installPath)
	Installer.copyVersion(installPath)
	Installer.installProfile(installPath)
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