import { handleApi } from '@/utils/handleApi';

export default {
  // 获取用户信息
  getAccountInfo(params) {
    return handleApi({
      url: '/vue-admin-template/user/userInfo',
      method: 'POST',
      data: params
    });
  },
};

