import axios from 'axios';
import store from '@/store';
import { getUserToken } from '@/utils/authToken';

// 接口地址
class HttpRequest {
  constructor() {
    this.queue = {};
  }

  getInsideConfig() {
    // 请求头
    const config = {
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 10000,
      headers: {}
    };
    if (store.getters.token) {
      config.headers['X-Token'] = getUserToken();
    }
    return config;
  }

  destroy(url) {
    delete this.queue[url];
    // 取消全局loading
    if (!Object.keys(this.queue).length) {
      store.dispatch('app/apiLoading');
    }
  }

  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading
        if (!Object.keys(this.queue).length && !config.notload) {
          store.dispatch('app/apiLoading');
        }
        this.queue[url] = true;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // 响应拦截
    instance.interceptors.response.use(
      (response) => {
        this.destroy(url);
        const { data, status } = response;
        return { data, status };
      },
      (error) => {
        this.destroy(url);
        // console.log(error.request);
        // console.log(error.response);
        // console.log(error.message);
        // console.log(error.config);

        // 网络超时
        let errorInfo = error.response;
        if (!errorInfo) {
          errorInfo = {
            requestUrl: error.request.responseURL,
            statusText: error.request.statusText,
            status: error.request.status,
            message: error.message
          };
        }

        // 特定状态码返回结果
        if (error.response && error.response.data) {
          return Promise.resolve(error.response);
        }

        // 返回错误信息
        return Promise.reject(error);
      }
    );
  }

  request(options) {
    // 创建一个axios实例
    const instance = axios.create();
    // 参数合并
    options = Object.assign(this.getInsideConfig(), options);
    // 触发请求拦截器
    this.interceptors(instance, options.url);
    return instance(options);
  }
}

export default HttpRequest;
