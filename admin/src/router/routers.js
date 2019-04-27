import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
},
{
  path: '/',
  name: '_home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: '/home',
    name: 'home',
    meta: {
      hideInMenu: true,
      title: '首页',
      notCache: true,
      icon: 'md-home'
    },
    component: () => import('@/view/single-page/home')
  }]
},
{
  path: '/apartment',
  name: 'apartment',
  component: Main,
  meta: {
    hideInBread: true,
    access: ['super_admin']
  },
  children: [{
    path: 'index',
    name: '公寓管理',
    meta: {
      icon: 'md-planet',
      title: '公寓管理'
    },
    component: () => import('@/view/apartment/index.vue')
  },
  {
    path: 'create',
    name: '公寓创建',
    meta: {
      icon: 'md-planet',
      title: '公寓创建',
      hideInMenu: true
    },
    component: () => import('@/view/apartment/create.vue')
  },
  {
    path: 'detail/:id',
    name: '公寓详情',
    meta: {
      icon: 'md-planet',
      title: '公寓详情',
      hideInMenu: true
    },
    component: () => import('@/view/apartment/detail.vue')
  }
  ]
},
{
  path: '/admin',
  name: 'admin',
  component: Main,
  meta: {
    hideInBread: true
  },
  children: [{
    path: 'index',
    name: '宿管管理',
    meta: {
      icon: 'md-contacts',
      title: '宿管管理'
    },
    component: () => import('@/view/admin/index.vue')
  }, {
    path: 'create',
    name: '宿管创建',
    meta: {
      icon: 'md-planet',
      title: '宿管创建',
      hideInMenu: true
    },
    component: () => import('@/view/admin/create.vue')
  },
  {
    path: 'detail/:id',
    name: '宿管详情',
    meta: {
      icon: 'md-planet',
      title: '宿管详情',
      hideInMenu: true
    },
    component: () => import('@/view/admin/detail.vue')
  }]
},
{
  path: '/student',
  name: 'student',
  component: Main,
  meta: {
    hideInBread: true,
    access: ['super_admin', 'admin']
  },
  children: [{
    path: 'index',
    name: '学生管理',
    meta: {
      icon: 'md-people',
      title: '学生管理'
    },
    component: () => import('@/view/student/index.vue')
  }, {
    path: 'create',
    name: '学生创建',
    meta: {
      icon: 'md-people',
      title: '学生创建',
      hideInMenu: true
    },
    component: () => import('@/view/student/create.vue')
  },
  {
    path: 'detail/:id',
    name: '学生详情',
    meta: {
      icon: 'md-planet',
      title: '学生详情',
      hideInMenu: true
    },
    component: () => import('@/view/student/detail.vue')
  }]
},
{
  path: '/water',
  name: 'water',
  component: Main,
  meta: {
    hideInBread: true
  },
  children: [{
    path: 'index',
    name: '用水管理',
    meta: {
      icon: 'md-water',
      title: '用水管理'
    },
    component: () => import('@/view/water/index.vue')
  },
  {
    path: 'detail/:id',
    name: '用水详情',
    meta: {
      icon: 'md-planet',
      title: '用水详情',
      hideInMenu: true
    },
    component: () => import('@/view/water/detail.vue')
  }]
},
{
  path: '/electricity',
  name: 'electricity',
  component: Main,
  meta: {
    hideInBread: true
  },
  children: [{
    path: 'index',
    name: '用电管理',
    meta: {
      icon: 'md-outlet',
      title: '用电管理'
    },
    component: () => import('@/view/electricity/index.vue')
  },
  {
    path: 'detail/:id',
    name: '用电详情',
    meta: {
      icon: 'md-planet',
      title: '用电详情',
      hideInMenu: true
    },
    component: () => import('@/view/electricity/detail.vue')
  }]
},
{
  path: '/maintain',
  name: '维修管理',
  meta: {
    icon: 'md-construct',
    title: '维修管理',
    access: ['super_admin', 'admin']
  },
  component: Main,
  children: [{
    path: 'log',
    name: '维修日志',
    meta: {
      icon: 'md-list-box',
      title: '维修日志'
    },
    component: () => import('@/view/maintain/log.vue')
  },
  {
    path: 'staff',
    name: '维修人员',
    meta: {
      icon: 'md-person',
      title: '维修人员'
    },
    component: () => import('@/view/maintain/staff.vue')
  },
  {
    path: 'createStaff',
    name: '维修人员创建',
    meta: {
      icon: 'md-person',
      title: '维修人员创建',
      hideInMenu: true
    },
    component: () => import('@/view/maintain/createStaff.vue')
  },
  {
    path: 'staffDetail/:id',
    name: '维修人员详情',
    meta: {
      icon: 'md-person',
      title: '维修人员详情',
      hideInMenu: true
    },
    component: () => import('@/view/maintain/staffDetail.vue')
  },
  {
    path: 'logDetail/:id',
    name: '日志详情',
    meta: {
      icon: 'md-planet',
      title: '日志详情',
      hideInMenu: true
    },
    component: () => import('@/view/maintain/logDetail.vue')
  }
  ]
},

{
  path: '/message',
  name: 'message',
  component: Main,
  meta: {
    hideInBread: true,
    hideInMenu: true,
    access: ['super_admin']
  },
  children: [{
    path: 'message_page',
    name: 'message_page',
    meta: {
      icon: 'md-notifications',
      title: '消息中心'
    },
    component: () => import('@/view/single-page/message/index.vue')
  }]
},
{
  path: '/error_logger',
  name: 'error_logger',
  meta: {
    hideInBread: true,
    hideInMenu: true
  },
  component: Main,
  children: [{
    path: 'error_logger_page',
    name: 'error_logger_page',
    meta: {
      icon: 'ios-bug',
      title: '错误收集'
    },
    component: () => import('@/view/single-page/error-logger.vue')
  }]
},
{
  path: '/401',
  name: 'error_401',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/401.vue')
},
{
  path: '/500',
  name: 'error_500',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/500.vue')
},
{
  path: '*',
  name: 'error_404',
  meta: {
    hideInMenu: true
  },
  component: () => import('@/view/error-page/404.vue')
}
]
