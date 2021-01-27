import config from '@/config';

/**
 * @description 获取路由的标题
 * @param {Object} route  路由对象值
 */
export const getRouteTitleHandled = (route) => {
  const router = { ...route };
  const meta = { ...route.meta };
  let title = '';
  if (meta.title) {
    if (typeof meta.title === 'function') {
      meta.__titleIsFunction__ = true;
      title = meta.title(router);
    } else title = meta.title;
  }
  meta.title = title;
  router.meta = meta;
  return router;
};

/**
 * @description 设置当前路由在浏览器的title
 * @param {Object} item  路由对象值
 */
export function showTitle(item, vm) {
  let title = (item.meta && item.meta.title) || item.title;
  if (!title) return '';

  const arr = title.split('.');
  // 如果是用 i18n 多语言
  if (arr.length && arr[0] === 'menuTitle') {
    title = vm.$t(title.trim());
  } else {
    title = (item.meta && item.meta.title) || item.title;
  }

  return title;
}

/**
 * @description 根据当前跳转的路由设置显示在浏览器标签的title
 * @param {Object} routeItem 路由对象
 * @param {Object} vm Vue实例
 */
export const getPageTitle = (routeItem, vm) => {
  const handledRoute = getRouteTitleHandled(routeItem);
  const pageTitle = showTitle(handledRoute, vm);
  const resTitle = pageTitle ? `${config.title} - ${pageTitle}` : config.title;
  window.document.title = resTitle;
};
