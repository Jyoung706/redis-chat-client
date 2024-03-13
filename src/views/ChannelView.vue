<template>
  <div
    v-for="(roomInfo, index) in room"
    class="chat_room"
    @click="routingChat(index, roomInfo)"
    :key="index"
  >
    {{ roomInfo }}
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue'
import router from '@/router'
import { useSocketStore } from '@/stores/socketStore'

const socketStore = useSocketStore()
const room = ref(['채팅방1', '채팅방2', '채팅방3'])

const routingChat = (index, roomInfo) => {
  router.push(`/chat/${index}`)
}

onMounted(async () => {
  await socketStore.socketInit()
  socketStore.login()
})
</script>
<style scoped>
.chat_room {
  border: 1px solid black;
  width: 100px;
}
.chat_room:hover {
  background-color: #f0f0f0;
}
</style>
