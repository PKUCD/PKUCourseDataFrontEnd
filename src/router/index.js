import Vue from 'vue'
import VueRouter from 'vue-router'
import create from '../components/create.vue'
import change from  '../components/change.vue'
import browse from  '../components/browse.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/change',
    redirect:'/create',
    redirect:'/browse',
  },
  {
    path:'/browse',
    name:'browse',
    component:browse
  },
  {
    path:'/create',
    name:'create',
    component:create
  },
  {
    path:'/change',
    name:'change',
    component:change
  }
]

const router = new VueRouter({
  routes
})

export default router
