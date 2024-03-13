import { io } from 'socket.io-client'
import { defineStore } from 'pinia'
const { VITE_SERVER_SOCKET_URL } = import.meta.env

export const useSocketStore = defineStore('counter', {
  state: () => ({
    socket: null
  }),
  actions: {
    socketInit() {
      return new Promise((resolve, reject) => {
        if (this.socket === null) {
          this.socket = io(VITE_SERVER_SOCKET_URL, { transports: ['websocket'] })

          this.socket.on('connect', () => {
            console.log(`connected : ${this.socket.id}`)
            resolve(this.socket)
          })

          this.socket.on('connect_error', (error) => {
            console.log('connect_error : ', error)
            reject(error)
          })
        } else {
          resolve(this.socket)
        }
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
    },
    joinRoom(room, userId) {
      this.socket.emit('joinRoom', { room, userId: this.socket.id }, (callback) => {
        console.log(callback)
      })
    }
  }
})
