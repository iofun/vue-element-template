import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/* 公共样式引入 */
import 'normalize.css/normalize.css';
import '@/styles/index.scss';
import '@/router/permission';
import '@/icons/svg';
import '@/icons/ion';

// 中文版 element-ui，按如下方式声明
Vue.use(ElementUI);

// 英文版 element-ui，按如下方式声明
// import locale from 'element-ui/lib/locale/lang/zh-CN'
// Vue.use(ElementUI, { locale })

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
