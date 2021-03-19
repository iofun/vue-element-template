import Vue from 'vue';
import Router from 'vue-router';
import config from '@/config';
import baseRoutes from './modules/base';
import appRoutes from './modules/app';

Vue.use(Router);

const createRouter = () => new Router({
  mode: config.routerModel,
  scrollBehavior: () => ({ y: 0 }),
  routes: baseRoutes.concat(appRoutes)
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
