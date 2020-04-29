import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/events',
    name: 'Events',
    component: () => import('@/views/Events'),
  },
  {
    path: '/play/:event',
    name: 'Play',
    component: () => import('@/views/Play'),
  },
  {
    path: '/creator',
    name: 'Creator',
    component: () => import('@/views/Creator'),
  },
  {
    path: '*',
    name: 'Home',
    component: Home,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
