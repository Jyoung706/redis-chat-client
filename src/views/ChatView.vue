<template>
  <div>채팅방 {{ roomTitle }}</div>
</template>

<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useSocketStore } from '@/stores/socketStore'

const roomTitle = ref('')
// const socketStore = useSocketStore()

// const sendMessage = () => {
//   socketStore.sendMessage(socketStore.socket.id, contents.value)
//   chattingList.value.push({ id: socketStore.socket.id, message: contents.value })
//   contents.value = ''
// }

const chattingList = ref([])
const contents = ref('')

onMounted(() => {
  roomTitle.value = router.currentRoute.value.params.channelId
})

const test = () => {
  console.log(socketStore.socket.id)
}
</script>

<style scoped></style>
