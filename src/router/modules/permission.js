import Layout from '@/layout'
// permission
let permissionRouter = [
  {
  path: '/permission',
  component: Layout,
  redirect: '/permission/page',
  name: 'permission',
  alwaysShow: true,
  meta: {
    title: 'Permission',
    icon: 'example',
    roles: ['admin','editor']
  },
  children: [
    {
      path: 'page',
      component: () => import('@/views/permission/perPage'),
      name: 'perPage',
      meta: {
        title: 'Page',
        roles: ['admin']
      },
    },
    {
      path: 'directive',
      component: () => import('@/views/permission/perDirective'),
      name: 'perDirective',
      meta: {
        title: 'Directive',
        roles: ['admin','editor']
      },
    },
    {
      path: 'role',
      component: () => import('@/views/permission/perRole'),
      name: 'perRole',
      meta: {
        title: 'Role',
        roles: ['admin']
      },
    },
  ]
},
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: 'example',
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

export default permissionRouter
