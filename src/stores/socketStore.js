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
    login(account) {
      return new Promise((resolve, reject) => {
        this.socket.emit('login', { account, socketId: this.socket.id }, (callback) => {
          resolve(callback)
        })
      })
    },
    sendMessage(roomId, id, message) {
      this.socket.emit('sendMessage', { roomId, id, message }, (callback) => {
        console.log(callback)
      })
    },
    joinRoom(form) {
      this.socket.emit('joinRoom', form, (callback) => {
        console.log(callback)
      })
    },
    leaveRoom(room, userId) {
      this.socket.emit('leaveRoom', { room, userId: this.socket.id }, (callback) => {
        console.log(callback)
      })
    },
    homeEnter(id) {
      return new Promise((resolve, reject) => {
        this.socket.emit('homeEnter', { userId: id }, (callback) => {
          resolve(callback.message.chatRoom)
        })
      })
    }
  }
})
