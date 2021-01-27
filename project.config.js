module.exports = {
  gitDevPath: '',
  gitProPath: '',
  commitText: process.env.NODE_ENV === 'development' ? '【测试服】' : '【正式服】'
};
