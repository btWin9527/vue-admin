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
      path: 'sqlEditor',
      component: () => import('@/views/vuestudy/sqlEditor'), // Parent router-view
      name: 'sqlEditor',
      meta: {title: 'sqlEditor'},
    },
    {
      path: 'scrollCalendar',
      component: () => import('@/views/vuestudy/scrollCalendar'), // Parent router-view
      name: 'scrollCalendar',
      meta: {title: 'scrollCalendar'},
    },
    {
      path: 'd3orgChart',
      component: () => import('@/views/vuestudy/d3orgChart'), // Parent router-view
      name: 'd3orgChart',
      meta: {title: 'd3orgChart'},
    },
    // {
    //   path: 'orgChart',
    //   component: () => import('@/views/vuestudy/orgChart'), // Parent router-view
    //   name: 'orgChart',
    //   meta: {title: 'orgChart'},
    // },
    {
      path: 'handsontable',
      component: () => import('@/views/vuestudy/handsontable'), // Parent router-view
      name: 'handsontable',
      meta: {title: 'handsontable'},
    },
    {
      path: 'vue3HighLight',
      component: () => import('@/views/vuestudy/vue3Highlight'), // Parent router-view
      name: 'vue3HighLight',
      meta: {title: 'vue3HighLight'},
    },
    {
      path: 'vue3Demo',
      component: () => import('@/views/vuestudy/vue3Demo'), // Parent router-view
      name: 'vue3Demo',
      meta: {title: 'vue3Demo'},
    },
    {
      path: 'excelRead',
      component: () => import('@/views/vuestudy/excelRead'), // Parent router-view
      name: 'excelRead',
      meta: {title: 'excelRead'},
    },
    {
      path: 'imgTrim',
      component: () => import('@/views/vuestudy/imgTrim'), // Parent router-view
      name: 'imgTrim',
      meta: {title: 'imgTrim'},
    },
    {
      path: 'cssDisplay',
      component: () => import('@/views/vuestudy/cssDisplay'), // Parent router-view
      name: 'cssDisplay',
      meta: {title: 'cssDisplay'},
    },
    {
      path: 'vueGantt',
      component: () => import('@/views/vuestudy/vue-gantt'), // Parent router-view
      name: 'vueGantt',
      meta: {title: 'vueGantt'},
    },
    {
      path: 'fullCalender',
      component: () => import('@/views/vuestudy/fullCalender'), // Parent router-view
      name: 'fullCalender',
      meta: {title: 'fullCalender'},
    },
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
