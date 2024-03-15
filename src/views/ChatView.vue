<template>
  <div class="flex_container">
    <div>채팅방 {{ roomTitle }}</div>
    <div><button @click="leaveClickHandler">나가기</button></div>
  </div>
  <div>
    <ul>
      <li v-for="items in chattingList">
        {{ items.type === 'system' ? items.message : `${items.id} : ${items.message}` }}
      </li>
    </ul>
  </div>
  <div>
    <input type="text" @keyup.enter="sendClickHandler" v-model="contents" />
    <button @click="sendClickHandler">전송</button>
  </div>
</template>

<script setup>
import router from '@/router'
import { onMounted, ref } from 'vue'
import { useSocketStore } from '@/stores/socketStore'

const roomTitle = ref('')
const socketStore = useSocketStore()

const sendClickHandler = () => {
  if (!contents.value) return
  socketStore.sendMessage(roomTitle.value, socketStore.socket.id, contents.value)
  chattingList.value.push({ id: socketStore.socket.id, message: contents.value })
  contents.value = ''
  return
}

const chattingList = ref([])
const contents = ref('')

socketStore.socket.on('message', (message) => {
  chattingList.value.push(message)
})

const leaveClickHandler = () => {
  router.push('/channel')
  socketStore.leaveRoom(roomTitle.value)
}

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
