const { google } = require('googleapis')
const drive = google.drive({ version: "v3", auth: "AIzaSyA13vMIhtNRKkPJnICBejqpo5cdqNJf2vY" })
const os = require("os");

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
    const dest = fs.createWriteStream(path.join(os.tmpdir(), name));
    stream.data.on('error', err => {
      done(err);
    }).on('end', ()=>{
      mkdir
    })
    .pipe(dest);

  }
}

module.exports = Downloader;