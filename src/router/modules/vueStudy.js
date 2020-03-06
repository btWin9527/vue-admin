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
      component: () => import('@/views/vuestudy/vueSlot/index'), // Parent router-view
      name: 'vueSlot',
      meta: {title: 'Slot'},
    },
    {
      path: 'routerjump',
      component: () => import('@/views/vuestudy/routerJump/index'),
      meta: {title: 'RouterJump'},
      name: 'RouterJump',
    },
    {
      path: 'vueAttr',
      component: () => import('@/views/vuestudy/vueAttr/index'),
      meta: {title: 'vueAttr'},
      name: 'vueAttr',
    },
    {
      path: 'article',
      component: () => import('@/views/vuestudy/articleList/index'),
      meta: {title: 'article'},
      name: 'article',
    },
    {
      path: 'lifeCycle',
      component: () => import('@/views/vuestudy/lifeCycle/index'),
      meta: {title: 'lifeCycle'},
      name: 'lifeCycle',
    },
    {
      path: 'componentsexample',
      component: () => import('@/views/vuestudy/componentsExample/index'),
      meta: {title: 'componentsExm'},
      name: 'componentsExm',
    }
  ]
};


export default vueStudyRouter
