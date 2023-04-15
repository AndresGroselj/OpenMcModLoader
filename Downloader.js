const { google } = require('googleapis')
const drive = google.drive({ version: "v3", auth: "AIzaSyA13vMIhtNRKkPJnICBejqpo5cdqNJf2vY" })
const path = require("path")
const os = require("os");
const fs = require('fs-extra');

class Downloader {
  static async listDirectory(directoryId){
      let fconf = {};
      fconf.maxResults = 10;
      fconf.orderBy = "createdTime";
      fconf.q = `'${directoryId}' in parents`;

      return new Promise((resolve, reject) => {
        drive.files.list(fconf, function (error, response) {
          if (error) {
            reject(error);
          } else {
            resolve(response.data.files);
          }
        });
      });
  }

  static async downloadFile(fileId){
      let fconf = {};
      fconf.fileId = fileId;
      fconf.alt = "media";


      return new Promise((resolve, reject) => {
        drive.files.get(
          fconf,
          {responseType: 'stream'}, 
          function (error, response) {
            if (error) {
              reject(error);
            } else {
              resolve(response);
            }
          }
        );
      });
  }

  static async saveFileStream(stream, name){
    const p = path.join(os.tmpdir(), name);
    console.log("saving!!! ######################")
    console.log(p)
    const dest = fs.createWriteStream(p);
    stream.data.on('error', err => {
      done(err);
    }).on('end', ()=>{
      
    })
    .pipe(dest);

  }
}

module.exports = Downloader;