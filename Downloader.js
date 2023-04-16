const { google } = require('googleapis')
const drive = google.drive({ version: "v3", auth: "AIzaSyA13vMIhtNRKkPJnICBejqpo5cdqNJf2vY" })
const path = require("path")
const os = require("os");
const fs = require('fs-extra');
const Progress = require("./Progress")

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

  static async downloadFile(fileId, name){
    const p = path.join(os.tmpdir(), name);
    const dest = fs.createWriteStream(p);

    Progress.getInstance().status = "Starting download";

    return new Promise((resolve, reject) => {
      drive.files.get(
        {
          fileId: fileId,
          alt: 'media'
        },
        {responseType: "stream"}, 
        (err, { data }) => {
          if (err) {
            reject(err);
          } else {
            data
              .on('end', () => {
                console.log('Download completed.');
                resolve();
              })
              .on('error', err => reject(err))
              .on('data', chunk => {
                Progress.getInstance().status = "Downloading";
                Progress.getInstance().value += chunk.length;
              })
              .pipe(dest);

            ;
          }
        }
      );
    });
  }

  static async getFileSize(fileId){
    let fconf = {};
    fconf.fileId = fileId;

    return new Promise((resolve, reject) => 
      drive.files.get(
        fconf, 
        function (err, metadata) {
          if (err) return reject(err)
          else resolve(metadata.size)
        }
      )
    );
  }

}

module.exports = Downloader;