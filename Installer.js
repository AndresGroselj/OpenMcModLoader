const fs = require('fs-extra');

class Installer{
	static copyMods(installPath){
		var modsDestinyPath = path.join(installPath, "mods")
		var mods = getFileNames(paths.modsSource)
		console.log(mods)

		mods.forEach(element => {
			var mod = path.join(paths.modsSource, element)
			copy(mod, modsDestinyPath)
		});
	}

	static copyVersion(installPath){
		let versionDestinyPath = path.join(installPath, "versions")
		let version = getFileNames(paths.versionSource)[0]
		copy(path.join(paths.versionSource, version), versionDestinyPath)
	}

	static installProfile(installPath){
		let profileDestinyPath = path.join(installPath, "launcher_profiles.json");

		let sourceRawdata = fs.readFileSync(paths.profileSource);
		let sourceProfile = JSON.parse(sourceRawdata);

		let destinyRawdata = fs.readFileSync(profileDestinyPath);
		let destinyProfile = JSON.parse(destinyRawdata);
		
		destinyProfile["profiles"][Object.keys(sourceProfile)[0]] = sourceProfile[Object.keys(sourceProfile)[0]]

		destinyRawdata = JSON.stringify(destinyProfile, null, "\t");
		fs.writeFileSync(profileDestinyPath, destinyRawdata);
	}

	static getFileNames(filePath){
		var modNames = fs.readdirSync(filePath)
		return modNames
	}

	static copy(file, destination){
		fs.copy(file, path.join(destination, path.basename(file)), (err) => {if (err) throw err;});
	}
}

module.exports = Installer;