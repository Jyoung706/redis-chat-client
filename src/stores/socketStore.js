import { io } from 'socket.io-client'
import { defineStore } from 'pinia'

export const useSocketStore = defineStore('counter', {
  state: () => ({
    socket: null
  }),
  actions: {
    socketInit() {
      this.socket = io('http://localhost:8000', { transports: ['websocket'] })

      this.socket.emit('connection', (callback) => {
        console.log(callback)
      })
    },
    login() {
      console.log(this.socket.id)
      this.socket.emit('login', `${this.socket.id} connected`, (callback) => {
        console.log(callback)
      })
    },
    sendMessage(id, message) {
      this.socket.emit('sendMessage', { id, message }, (callback) => {
        console.log(callback)
      })
    }
    /* message() {
      this.socket.on('message', (message) => {
        console.log('recieve : ', message)
      })
    } */
  }
})
