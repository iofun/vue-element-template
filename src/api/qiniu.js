import { handleApi } from '@/utils/handleApi';

export default {
  getQiniuToken(params) {
    return handleApi({
      url: '/qiniu/upload/token',
      method: 'GET',
      data: params
    });
  }
};
