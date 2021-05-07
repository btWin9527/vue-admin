import Layout from '@/layout'
// vueStudy
let vueStudyRouter = {
  path: '/vuestudy',
  component: Layout,
  redirect: '/vuestudy/slot',
  name: 'vueStudy',
  meta: {
    title: 'VueStudy',
    icon: 'nested'
  },
  children: [
    {
      path: 'vueslot',
      component: () => import('@/views/vuestudy/vueSlot'), // Parent router-view
      name: 'vueSlot',
      meta: {title: 'Slot'},
    },
    {
      path: 'routerjump',
      component: () => import('@/views/vuestudy/routerJump'),
      meta: {title: 'RouterJump'},
      name: 'RouterJump',
    },
    {
      path: 'vueAttr',
      component: () => import('@/views/vuestudy/vueAttr'),
      meta: {title: 'vueAttr'},
      name: 'vueAttr',
    },
    {
      path: 'article',
      component: () => import('@/views/vuestudy/articleList'),
      meta: {title: 'article'},
      name: 'article',
    },
    {
      path: 'lifeCycle',
      component: () => import('@/views/vuestudy/lifeCycle'),
      meta: {title: 'lifeCycle'},
      name: 'lifeCycle',
    },
    {
      path: 'componentsexample',
      component: () => import('@/views/vuestudy/componentsExample'),
      meta: {title: 'componentsExm'},
      name: 'componentsExm',
    },
    {
      path: 'elecomponents',
      component: () => import('@/views/vuestudy/eleComponents'),
      meta: {title: 'eleComponents'},
      name: 'eleComponents',
    },
    {
      path: 'websocket',
      component: () => import('@/views/vuestudy/webSocket'),
      meta: {title: 'webSocket'},
      name: 'webSocket',
    },
    {
      path: 'vuexalong',
      component: () => import('@/views/vuestudy/vuexAlong'),
      meta: {title: 'vuexAlong'},
      name: 'vuexAlong',
    },
  ]
};


export default vueStudyRouter
