import { handleApi } from '@/utils/handleApi';

export default {
  getList(params) {
    return handleApi({
      url: '/vue-admin-template/table/list',
      method: 'GET',
      data: params
    });
  }
};

