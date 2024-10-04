import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/country/:id',
    name: 'Country',
    component: () => import('@/views/CountryView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
