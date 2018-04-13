import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading

/* layout */
import Layout from '../views/layout/Layout'

/* login */
const Login = _import('login/index')

/* dashboard */
const dashboard = _import('dashboard/index')

/* error page */
const Err404 = _import('404')

/* page */
// const Account = _import('page/account')
const Chat = _import('page/chat')
const Admin = _import('page/admin')
const Level = _import('page/level')
const Warn = _import('page/warn')
const NoSay = _import('page/noSay')
const NoUse = _import('page/noUse')
const Room = _import('page/room')
const Issue = _import('page/issue')
const HotChat = _import('page/hotChat')
const Notice = _import('page/notice')
const AddNotice = _import('page/addnotice')
const viewNotice = _import('page/viewnotice')

Vue.use(Router)

 /**
  * icon : the icon show in the sidebar
  * hidden : if `hidden:true` will not show in the sidebar
  * redirect : if `redirect:noredirect` will not redirct in the levelbar
  * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
  * meta : `{ role: ['admin'] }`  will control the page role
  **/
export const constantRouterMap = [
  { path: '/login', component: Login, hidden: true },
  { path: '/404', component: Err404, hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Home',
    hidden: true,
    children: [{ path: 'dashboard', component: dashboard }]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/crManage',
    component: Layout,
    redirect: 'noredirect',
    icon: 'zonghe',
    noDropdown: false,
    name: '聊天室管理',
    children: [
      { path: 'chat', component: Chat, name: '聊天室管理设置' },
      { path: 'admin', component: Admin, name: '管理员设置' },
      { path: 'level', component: Level, name: '聊天门槛设置' }
    ]
  },
  {
    path: '/crWarn',
    component: Layout,
    redirect: 'noredirect',
    icon: 'zonghe',
    noDropdown: false,
    name: '聊天举报管理',
    children: [
      { path: 'warn', component: Warn, name: '举报管理' },
      { path: 'noSay', component: NoSay, name: '禁言管理' },
      { path: 'noUse', component: NoUse, name: '禁用管理' }
    ]
  },
  {
    path: '/crIssue',
    component: Layout,
    redirect: 'noredirect',
    icon: 'zonghe',
    noDropdown: false,
    name: '聊天室发布',
    children: [
      { path: 'room', component: Room, name: '大厅设置' },
      { path: 'issue', component: Issue, name: '聊天室发布设置' },
      { path: 'hotChat', component: HotChat, name: '热门聊天发布' },
      { path: 'notice', component: Notice, name: '聊天公告发布' },
      { path: 'addnotice', hidden: true, component: AddNotice, name: '添加公告' },
      { path: 'viewnotice', hidden: true, component: viewNotice, name: '查看公告' }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
