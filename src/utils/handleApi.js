import HttpRequest from '@/utils/ajax';
import store from '@/store';
import { Message } from 'element-ui';
const ajax = new HttpRequest();

export const handleApi = (requestParams) => {
  return new Promise((resolve, reject) => {
    // 统一处理请求参数
    const newRequestParams = requestParams;
    if (requestParams.method.toUpperCase() === 'GET') {
      const getParams = requestParams.data;
      newRequestParams.params = getParams || {};
      delete requestParams['data'];
    }
    // console.log(newRequestParams);

    // 创建请求
    ajax.request(newRequestParams).then((response) => {
      const result = response.data;

      if (result.code === 99006 || result.code === 50008 || result.code === 50012 || result.code === 50014) {
        // 错误提示
        Message.error({ message: result.message || 'Request Error', duration: 2000 });

        // 移除token
        store.dispatch('auth/resetToken').then(() => {
          location.reload();
        });
      }
      resolve(result);
    }).catch((error) => {
      console.log(error);

      // 错误提示
      Message.error({ message: error.message || 'Request Error', duration: 2000 });
      reject(new Error(error.message || 'Request Error'));
    });
  });
};
