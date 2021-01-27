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
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

const demoRoutes = [
  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        meta: { title: '一级菜单', icon: 'form' },
        component: () => import('@/views/demo/form')
      }
    ]
  },
  {
    path: '/example',
    name: 'Example',
    redirect: '/example/table',
    component: Layout,
    meta: { title: '菜单示例', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        meta: { title: 'Table', icon: 'table' },
        component: () => import('@/views/demo/table')
      },
      {
        path: 'form',
        name: 'Example_form',
        meta: { title: '表单示例', icon: 'form' },
        component: () => import('@/views/demo/form')
      },
      {
        path: 'tree',
        name: 'Example_tree',
        meta: { title: '树形示例', icon: 'form' },
        component: () => import('@/views/demo/tree')
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: '多级菜单', icon: 'nested' },
    children: [
      {
        path: 'menu1',
        name: 'Menu1',
        meta: { title: 'Menu1' },
        component: () => import('@/views/demo/nested/menu1'), // Parent router-view
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' },
            component: () => import('@/views/demo/nested/menu1/menu1-1')
          },
          {
            path: 'menu1-2',
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            component: () => import('@/views/demo/nested/menu1/menu1-2'),
            children: [
              {
                path: 'menu1-2-1',
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' },
                component: () => import('@/views/demo/nested/menu1/menu1-2/menu1-2-1')
              },
              {
                path: 'menu1-2-2',
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' },
                component: () => import('@/views/demo/nested/menu1/menu1-2/menu1-2-2')
              }
            ]
          },
          {
            path: 'menu1-3',
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' },
            component: () => import('@/views/demo/nested/menu1/menu1-3')
          }
        ]
      },
      {
        path: 'menu2',
        name: 'Menu2',
        meta: { title: 'menu2' },
        component: () => import('@/views/demo/nested/menu2')
      }
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://baidu.com',
        meta: { title: '外部链接', icon: 'link' }
      }
    ]
  }
];

export default demoRoutes;
