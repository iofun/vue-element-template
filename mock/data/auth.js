
const tokens = {
  'admin@qq.com': {
    token: 'admin-token'
  },
  'editor@qq.com': {
    token: 'editor-token'
  }
};

const users = {
  'admin-token': {
    access: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://tvax1.sinaimg.cn/large/007X8olVly1g8282ggrhzj306706ajr9.jpg',
    phone: '123456789',
    username: 'Super Admin',
    nickname: '王富贵',
    realname: '张三'
  },
  'editor-token': {
    access: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    phone: '111222333444555',
    username: 'Normal Editor',
    nickname: 'editor',
    realname: '李四'
  }
};

module.exports = [
  // 登录
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body; // post 请求
      const token = tokens[username];

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.',
          data: ''
        };
      }

      return {
        code: 1,
        message: 'success',
        data: token
      };
    }
  },

  // 获取用户信息
  {
    url: '/vue-admin-template/user/userInfo\.*',
    type: 'post',
    response: config => {
      // const { token } = config.query; // get 请求
      // const { token } = config.body; // post 请求
      const token = config.headers['authorization'];
      const info = users[token];

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.',
          data: ''
        };
      }

      return {
        code: 1,
        message: 'success',
        data: info
      };
    }
  },

  // 退出
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 1,
        message: 'success',
        data: ''
      };
    }
  },

  // 获取验证码
  {
    url: '/vue-admin-template/user/getForgetCode',
    type: 'post',
    response: _ => {
      return {
        code: 1,
        message: 'success',
        data: '123456'
      };
    }
  },
  // 校验验证码
  {
    url: '/vue-admin-template/user/verifyForgetCode',
    type: 'post',
    response: _ => {
      return {
        code: 1,
        message: 'success',
        data: 'DSDS41WE1RWfswfsrzds11'
      };
    }
  },
  // 重置密码
  {
    url: '/vue-admin-template/user/outResetPassword',
    type: 'post',
    response: _ => {
      return {
        code: 1,
        message: 'success',
        data: 'success'
      };
    }
  }
];
