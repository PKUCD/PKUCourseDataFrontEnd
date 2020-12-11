import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Profile from '@/components/Profile'
import ProfileModify from '@/components/ProfileModify'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
