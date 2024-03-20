<template>
  <div class="flex justify-between">
    <div class="flex flex-col">
      <section class="border-solid w-40 h-auto pt-5 flex flex-col justify-center items-center mb-5">
        <header class="">친구목록</header>
        <ul class="flex flex-col gap-y-1 list-none p-0">
          <li
            v-for="item in friendLists"
            @click="frientClickHandler(item)"
            class="w-10 border-solid border-2 hover:bg-slate-400 cursor-pointer"
          >
            {{ item.account }}
          </li>
        </ul>
      </section>
      <section class="border-solid w-40 h-40 flex flex-col justify-center items-center mb-5">
        <header>대화방 목록</header>
        <ul class="flex flex-col gap-y-1 list-none p-0">
          <li
            v-for="item in chatRoomList"
            class="w-28 border-solid border-2 hover:bg-slate-400 cursor-pointer"
            @click="chatRoomClickHandler(item)"
          >
            {{ item.roomName }}
          </li>
        </ul>
      </section>
    </div>
    <div>
      <section v-if="currentChatting">
        <header class="">채팅</header>
        <ul>
          <li v-for="item in chattingList" class="hover:bg-slate-400">
            <!-- <div>{{ item.id }} : {{ item.message }}</div> -->
            {{ console.log('item : ', item) }}
          </li>
        </ul>
        <div>
          <input type="text" v-model="contents" />
          <button @click="sendMessage">전송</button>
          <button @click="backClickHandler">뒤로</button>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSocketStore } from '@/stores/socketStore'
import { useUserStore } from '@/stores/userStore'

const friendLists = ref([])
const currentChatting = ref('')

const socketStore = useSocketStore()
const userStore = useUserStore()

const chatRoomList = ref([])

socketStore.socket.on('roomInfoChange', (data) => {
  console.log(data)
})

onMounted(async () => {
  const data = await socketStore.login(userStore.getUser().account)
  console.log('data : ', data)
  userStore.user = data.myInfo
  friendLists.value = data.friendList
  console.log('userStore : ', userStore)
  const roomList = await socketStore.homeEnter(userStore.user._id)
  console.log('roomList : ', roomList)
  chatRoomList.value = roomList
})

const frientClickHandler = (info) => {
  currentChatting.value = info
}

const backClickHandler = () => {
  currentChatting.value = ''
}

const chatRoomClickHandler = (info) => {
  currentChatting.value = info
}

const test = () => {
  console.log(currentChatting.value)
}

const chattingList = ref([])
const contents = ref('')

const sendMessage = () => {
  if (contents.value) {
    socketStore.joinRoom({
      sender: { id: userStore.user._id, account: userStore.user.account },
      receiver: { id: currentChatting.value._id, account: currentChatting.value.account }
    })
    // socketStore.joinRoom(userStore.user._id, currentChatting.value)
  }

  // socketStore.joinRoom()
  /* socketStore.sendMessage(``, currentChatting.value, contents.value)
  chattingList.value.push({
    id: userStore.user.account,
    message: contents.value,
    createdAt: new Date()
  }) */
  contents.value = ''
}

socketStore.socket.on('message', (message) => {
  chattingList.value.push(message)
})
</script>

<style scoped></style>
