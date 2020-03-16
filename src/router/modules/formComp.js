import Layout from '@/layout'

// 多级目录嵌套
let formCompRouter = /* 多级目录嵌套*/
  {
    path: '/form',
    component: Layout,
    redirect: '/form/menu1',
    name: 'Form',
    meta: {
      title: 'Form',
      icon: 'nested'
    },
    children: [
      {
        path: 'form',
        name: 'form',
        component: () => import('@/views/formComp/form.vue'),
        meta: {title: 'form'}
      },
      {
        path: 'checkbox',
        name: 'checkbox',
        component: () => import('@/views/formComp/checkbox.vue'),
        meta: {title: 'checkbox'}
      },
      {
        path: 'display',
        name:'display',
        component: () => import('@/views/formComp/display.vue'),
        meta: {title: 'display'}
      },
      {
        path: 'alert',
        name: 'alert',
        component: () => import('@/views/formComp/alert.vue'),
        meta: {title: 'alert'}
      },
      {
        path: '/table-render',
        name:'tableRender',
        component: () => import('@/views/formComp/table-render.vue'),
        meta: {title: 'tableRender'}
      },
      {
        path: '/table-slot',
        component: () => import('@/views/formComp/table-slot.vue'),
        name:'tableSlot',
        meta: {title: 'tableSlot'}
      },
      {
        path: '/tree',
        name:'tree',
        meta: {title: 'tree'},
        component: () => import('@/views/formComp/tree.vue')
      },
      {
        path: '/input-number',
        name:'inputNumber',
        meta: {title: 'inputNumber'},
        component: () => import('@/views/formComp/input-number.vue')
      },
    ]
  };


export default formCompRouter
