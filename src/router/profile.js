import Vue from 'vue'
import Router from 'vue-router'
import Profile from '@/components/Profile'
import ProfileModify from '@/components/ProfileModify'
import VueRouter from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/user',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/user/modify',
      name: 'ProfileModify',
      component: ProfileModify
    }
  ]
})
