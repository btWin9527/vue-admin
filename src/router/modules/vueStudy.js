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
      path: 'formEdit',
      component: () => import('@/views/vuestudy/formEdit'), // Parent router-view
      name: 'formEdit',
      meta: {title: 'formEdit'},
    },
    {
      path: 'signaturePad',
      component: () => import('@/views/vuestudy/signaturePad'), // Parent router-view
      name: 'signaturePad',
      meta: {title: 'signaturePad'},
    },
    {
      path: 'table',
      component: () => import('@/views/vuestudy/table'), // Parent router-view
      name: 'table',
      meta: {title: 'table'},
    },
    {
      path: 'gantt',
      component: () => import('@/views/vuestudy/gantt'), // Parent router-view
      name: 'gantt',
      meta: {title: 'gantt'},
    },
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
    {
      path: 'classIdx',
      component: () => import('@/views/vuestudy/classIdx'),
      meta: {title: 'classIdx'},
      name: 'classIdx',
    },
    {
      path: 'v-model',
      component: () => import('@/views/vuestudy/vModel'),
      meta: {title: 'vModel'},
      name: 'vModel',
    },
  ]
};


export default vueStudyRouter
