const fs = require('fs');
const os = require('os');
const path = require('path');
const platform = os.platform();
const homeDir = os.homedir();
const shell = require('shelljs');
const diskName = platform.indexOf('win32') > -1 ? 'E:' : homeDir;
const targetPath = path.join(diskName, '/www/data/monitor/storage/smap_cache');
const smPath = '../dist/static/js';

// console.log(targetPath)

// 递归根据目录创建文件夹
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  }
  if (mkdirsSync(path.dirname(dirname))) {
    fs.mkdirSync(dirname);
    return true;
  }
}
// 删除指定文件或文件夹
function deleteFolder(path) {
  let files = [];
  if (fs.existsSync(path)) {
    if (fs.statSync(path).isDirectory()) {
      files = fs.readdirSync(path);
      files.forEach(function(file) {
        const curPath = path + '/' + file;
        if (fs.statSync(curPath).isDirectory()) {
          deleteFolder(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(path);
    } else {
      fs.unlinkSync(path);
    }
  }
}

const moveFile = () => {
  const files = fs.readdirSync(path.resolve(__dirname, smPath));
  const smFiles = files.filter(file => /\.js\.map/.test(file));
  deleteFolder(targetPath);
  mkdirsSync(targetPath);
  smFiles.forEach(file => {
    const smFilePath = path.resolve(__dirname, smPath, file);
    if (platform === 'darwin') {
      shell.exec(`cp ${smFilePath} ${targetPath}`);
      shell.exec(`rm ${smFilePath}`);
    } else {
      shell.exec(`copy ${smFilePath} ${targetPath}`);
      shell.exec(`rimraf ${smFilePath}`);
    }
  });
};

moveFile();
