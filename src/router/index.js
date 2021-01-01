import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Home from '@/components/Home'
import Result from '@/components/Result'
import change from '@/components/change'
import create from '@/components/create'
import browse from '@/components/browse'
import Taglist from '@/components/Taglist'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/result',
    name: 'Result',
    component: Result
  },
  {
    path: '/change',
    name: 'change',
    component: change
  },
  {
    path: '/create',
    name: 'create',
    component: create
  },
  {
    path: '/browse',
    name: 'browse',
    component: browse
  },
  {
    path: '/Taglist',
    name: 'Taglist',
    component: Taglist
  },
]

const router = new Router({
  mode: 'history',
  routes
})
/*
router.beforeEach((to, form, next) => {
  if (to.path === '/login' || to.path === '/register') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})*/
export default router