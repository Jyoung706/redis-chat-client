import { createRouter, createWebHistory } from 'vue-router'
import { useSocketStore } from '@/stores/socketStore'

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

router.beforeEach(async (to, from, next) => {
  const socketStore = useSocketStore()

  if (!socketStore.socket && to.name !== 'LoginView') {
    await socketStore.socketInit()
    next()
    return
  }
  next()
})

export default router
