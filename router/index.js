import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Taglist from '@/components/Taglist'
import Result from '@/components/Result'
Vue.use(Router)

export default new Router({
	mode: "history",
  routes: [
    {
    path:'/',
    name: 'Home',
    component: Home,
    },
    {
      path: '/Taglist',
      name: 'Taglist',
      component: Taglist
    },
    {
      path: '/Result',
      name: 'Result',
      component: Result
    }
  ]

})
