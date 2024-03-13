<template></template>

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
