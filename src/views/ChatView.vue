<template>
  <div class="flex_container">
    <div>채팅방 {{ roomTitle }}</div>
    <div><button>나가기</button></div>
  </div>
</template>

<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useSocketStore } from '@/stores/socketStore'

const roomTitle = ref('')
const socketStore = useSocketStore()

// const sendMessage = () => {
//   socketStore.sendMessage(socketStore.socket.id, contents.value)
//   chattingList.value.push({ id: socketStore.socket.id, message: contents.value })
//   contents.value = ''
// }

const chattingList = ref([])
const contents = ref('')

onMounted(() => {
  roomTitle.value = router.currentRoute.value.params.channelId
  socketStore.joinRoom(router.currentRoute.value.params.channelId)
})
</script>

<style scoped>
.flex_container {
  display: flex;
  justify-content: space-between;
}
</style>
