const path = require('path');
const fs = require('fs');

const lib = {};

lib.baseDir = path.join(__dirname, '/../.data');

lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.baseDir}/${dir}/${file}.json`, 'utf-8', (err, data) => {
    callback(err, data);
  });
};

lib.create = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}/${dir}/${file}.json`, 'wx', (err, fd) => {
    if (!err && fd) {
      fs.writeFile(fd, JSON.stringify(data), err => {
        if (!err) {
          fs.close(fd, err => {
            if (!err) {
              callback(false);
            } else {
              callback(404, { error: 'File Closing Failed' });
            }
          });
        } else {
          callback(404, { error: 'File Creation Failed' });
        }
      });
    } else {
      callback(404, { error: 'File Openning Failed' });
    }
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.baseDir}/${dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const strData = JSON.stringify(data);

      fs.ftruncate(fileDescriptor, err => {
        if (!err) {
          fs.writeFile(fileDescriptor, strData, err => {
            if (!err) {
              fs.close(fileDescriptor, err => {
                if (!err) {
                  callback(false);
                } else {
                  callback(err);
                }
              });
            } else {
              callback(err);
            }
          });
        } else {
          callback(err);
        }
      });
    } else {
      callback(err);
    }
  });
};

module.exports = lib;
