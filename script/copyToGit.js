
const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { Command } = require('commander');
const inquirer = require('inquirer');
const childProcess = require('child_process');

// 封装console函数
// exports.logChalk = {
//   warning(msg = '') {
//     console.log(chalk.yellow(`${msg}`));
//   },
//   error(msg = '') {
//     console.log(chalk.red(`${msg}`));
//   },
//   success(msg = '') {
//     console.log(chalk.green(`${msg}`));
//   }
// };

// // 拷贝下载的repo资源
// exports.copyFiles = async(tempPath, targetPath, excludes = []) => {
//   const removeFiles = ['./git', './changelogs'];
//   // 资源拷贝
//   await fs.copySync(tempPath, targetPath);

//   // 删除额外的资源文件
//   if (excludes && excludes.length) {
//     await Promise.all(excludes.map(file => async() =>
//       await fs.removeSync(path.resolve(targetPath, file))
//     ));
//   }
// };

// // 解析用户输入的参数
// exports.parseCmdParams = (cmd) => {
//   if (!cmd) return {};
//   const resOps = {};
//   cmd.options.forEach(option => {
//     const key = this.camelize(option.long.replace(/^--/, ''));
//     // 如果不存在选项，并且Command具有相同名称的方法 ，不进行复制
//     if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
//       resOps[key] = cmd[key];
//     }
//   });
//   return resOps;
// };

// // 运行cmd命令
// exports.runCmd = (cmd) => {
//   return new Promise((resolve, reject) => {
//     childProcess.exec(cmd, (err, ...arg) => {
//       if (err) return reject(err);
//       return resolve(...arg);
//     });
//   });
// };

// // 获取git用户信息
// exports.getGitUser = () => {
//   return new Promise(async(resolve, reject) => {
//     const user = {};
//     try {
//       const [name] = await runCmd('git config user.name');
//       const [email] = await runCmd('git config user.email');
//       if (name) user.name = name.replace(/\n/g, '');
//       if (email) user.email = `<${email || ''}>`.replace(/\n/g, '');
//     } catch (error) {
//       this.logChalk.error(`获取用户Git信息失败`);
//       return reject(error);
//     } finally {
//       resolve(user);
//     }
//   });
// };

// // 驼峰处理
// exports.camelize = (str) => {
//   return str.replace(/-(\w)/g, (_, c) => c ? c.toUpperCase() : '');
// };

// // 仅将实际选项提取到新对象中。(commander 将 Command 对象本身作为选项传递，)
// exports.cleanArgs = (cmd) => {
//   const args = {};
//   cmd.options.forEach(o => {
//     const key = this.camelize(o.long.replace(/^--/, ''));
//     // 如果不存在选项，并且Command具有相同名称的方法 ，不进行复制
//     if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
//       args[key] = cmd[key];
//     }
//   });
//   return args;
// };

module.exports = class CopyToGit {
  constructor() {
    this.init();
  }
  init() {
    const questions = [
      {
        name: 'FILENAME',
        type: 'input',
        message: 'What is the name of the file without extension?'
      }
    ];
    inquirer.prompt(questions);
  }
  apply(compiler) {
    // console.log(compiler);
    process.stdin.setEncoding('utf8');
    process.stdout.write(`是否复制文件到`);
    compiler.hooks.done.tap('copyToGit', compilation => {
      // do something when webpack compilation done
      console.log(1);
      const questions = [
        {
          name: 'FILENAME',
          type: 'input',
          message: 'What is the name of the file without extension?'
        }
      ];
      inquirer.prompt(questions).then(answers => {
        // Use user feedback for... whatever!!
      });
    });
  }
};

