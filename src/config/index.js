module.exports = {
  // 系统名称
  title: 'API后台管理系统',

  // token前缀，重要
  tokenPrefix: 'element',

  // 路由模式（hash 或者 history）
  routerModel: 'history',

  // 没有重定向白名单
  whiteList: ['/login', '/welcome', '/forget'],

  // 错误日记 (production 或者 development)
  errorLog: 'production'
};
