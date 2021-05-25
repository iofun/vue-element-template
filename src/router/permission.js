import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getUserToken } from '@/utils/authToken';
import { whiteList } from '@/config';
import { getPageTitle } from '@/utils/libs';

// 初始化进度条
NProgress.configure({ showSpinner: false });

// 路由权限匹配
router.beforeEach(async(to, from, next) => {
  NProgress.start();

  // 设置标题
  getPageTitle(to, router.app);

  // 获取用户登录token
  const hasToken = getUserToken();

  // 如果用户已登录
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
      NProgress.done();
    } else {
      const hasLogin = store.getters.logged;
      if (hasLogin) {
        next();
      } else {
        try {
          await store.dispatch('auth/getAccountInfo');
          next();
          NProgress.done();
        } catch (error) {
          await store.dispatch('auth/resetToken');
          next(`/login?redirect=${to.path}`);
          NProgress.done();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 白名单路由，直接放行
      next();
    } else {
      // 其他无权访问的页面将重定向到登录页面
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
