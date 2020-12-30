import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)
const routes = [
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
  }
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