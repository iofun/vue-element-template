import { handleApi } from '@/utils/handleApi';

export default {
  // 登录
  login(params) {
    return handleApi({
      url: '/vue-admin-template/user/login',
      data: params,
      method: 'POST'
    });
  },
  // 退出
  logout(params) {
    return handleApi({
      url: '/vue-admin-template/user/logout',
      data: params,
      method: 'POST'
    });
  },
  // 获取重置密码验证码
  getForgetCode(params) {
    return handleApi({
      url: '/vue-admin-template/user/getForgetCode',
      data: params,
      method: 'POST'
    });
  },
  // 校验重置密码验证码
  verifyForgetCode(params) {
    return handleApi({
      url: '/vue-admin-template/user/verifyForgetCode',
      data: params,
      method: 'POST'
    });
  },
  // 确认重置密码
  outResetPassword(params) {
    return handleApi({
      url: '/vue-admin-template/user/outResetPassword',
      data: params,
      method: 'POST'
    });
  }
};
