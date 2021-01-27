import { handleApi } from '@/utils/handleApi';

export default {
  login(data) {
    return handleApi({
      url: '/vue-admin-template/user/login',
      method: 'POST',
      data
    });
  },
  getInfo(token) {
    return handleApi({
      url: '/vue-admin-template/user/info',
      method: 'GET',
      data: { token }
    });
  },
  logout() {
    return handleApi({
      url: '/vue-admin-template/user/logout',
      method: 'POST'
    });
  }
};
