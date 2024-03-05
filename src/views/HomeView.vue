<template>
  <div>socket connected</div>
  <div><button @click="routingLogin">go to Login</button></div>

  <div>채팅창</div>
  <div>
    <div v-for="chat in chattingList" :key="chat.id">{{ chat.id }} : {{ chat.message }}</div>
  </div>
  <div>
    <input type="text" @keyup.enter="sendMessage" v-model="contents" />
    <button id="chat" @click="sendMessage">전송</button>
  </div>
</template>

<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useSocketStore } from '@/stores/socketStore'

const socketStore = useSocketStore()

const routingLogin = () => {
  router.push('/')
}

onMounted(() => {
  socketStore.login()
})

const chattingList = ref([])
const contents = ref('')

const sendMessage = () => {
  socketStore.sendMessage(socketStore.socket.id, contents.value)
  chattingList.value.push({ id: socketStore.socket.id, message: contents.value })
  contents.value = ''
}

socketStore.socket.on('message', (message) => {
  chattingList.value.push(message)
})
</script>

<style scoped></style>
