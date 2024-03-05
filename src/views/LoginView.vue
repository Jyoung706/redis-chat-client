<template>
  <div>
    <div>
      <input type="text" v-model="account" />
    </div>
    <div>
      <input type="text" v-model="password" />
    </div>
    <div>
      <button @click="loginClickHandler">로그인</button>
    </div>
  </div>
</template>
<script setup>
import router from '@/router'
import { useSocketStore } from '@/stores/socketStore'
import { onMounted, ref } from 'vue'

const account = ref('')
const password = ref('')
const socketStore = useSocketStore()

onMounted(() => {
  socketStore.socketInit()
})

const loginClickHandler = () => {
  router.push('/home')
}
</script>
<style scoped></style>
