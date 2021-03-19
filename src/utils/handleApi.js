import HttpRequest from '@/utils/ajax';
import store from '@/store';
import { Message } from 'element-ui';
const ajaxInstance = new HttpRequest();
var hasAjaxTokenError = false;

export const handleApi = (requestParams) => {
  return new Promise((resolve, reject) => {
    if (hasAjaxTokenError) { return false; }

    // 统一处理请求参数
    const newRequestParams = requestParams;
    if (requestParams.method.toUpperCase() === 'GET') {
      const getParams = requestParams.data;
      newRequestParams.params = getParams || {};
      delete requestParams['data'];
    }
    // console.log(newRequestParams);

    // 创建请求
    ajaxInstance.request(newRequestParams).then((response) => {
      const result = response.data;

      // 统一处理提示
      if (result.code === 0) {
        Message.error({ message: result.message || 'Request Error', duration: 2000 });
      } else if (result.code === 422) {
        // 参数验证失败
        Message.error({ message: result.message || 'Request Error', duration: 2000 });
      } else if (result.code >= 1000) {
        // 特殊状态码处理
        Message.error({ message: result.message || 'Request Error', duration: 2000 });

        // token无效
        if (result.code === 1001) {
          hasAjaxTokenError = true;
          setTimeout(() => {
            hasAjaxTokenError = false;
            store.dispatch('auth/resetToken').then(() => {
              location.reload();
            });
          }, 2000);
        }
      }

      resolve(result);
    }).catch((error) => {
      // 错误提示
      Message.error({ message: error.message || 'Request Error', duration: 2000 });
      reject(new Error(error.message || 'Request Error'));
    });
  });
};
