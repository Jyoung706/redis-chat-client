import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    login(payload) {
      this.user = payload
    },
    getUser() {
      return this.user
    }
  }
})
