import Layout from '@/layout';

/**
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    access: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'name'/'el-icon-x'     the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const baseRoutes = [
  {
    path: '/welcome',
    hidden: true,
    meta: { title: '首页', icon: 'dashboard' },
    component: () => import('@/views/authen/welcome')
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('@/views/authen/login')
  },
  {
    path: '/forget',
    hidden: true,
    component: () => import('@/views/authen/forget')
  },
  {
    path: '/404',
    hidden: true,
    component: () => import('@/views/error/404')
  },
  {
    path: '/403',
    hidden: true,
    component: () => import('@/views/error/403')
  },
  {
    path: '/500',
    hidden: true,
    component: () => import('@/views/error/500')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      meta: { title: '控制台', icon: 'dashboard' },
      component: () => import('@/views/home')
    }]
  },
  {
    path: '/account',
    component: Layout,
    hidden: true,
    redirect: '/account/index',
    children: [
      {
        path: 'index',
        name: 'Account',
        meta: { title: '个人中心', icon: 'el-icon-user-solid' },
        component: () => import('@/views/account')
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

export default baseRoutes;
