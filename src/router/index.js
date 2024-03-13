import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LoginView',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/home',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/channel',
      name: 'ChannelView',
      component: () => import('@/views/ChannelView.vue')
    },
    {
      path: '/chat/:channelId',
      name: 'ChatView',
      component: () => import('@/views/ChatView.vue')
    }
  ]
})

export default router
