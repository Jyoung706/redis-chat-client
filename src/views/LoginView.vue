<template>
  <div>
    <div>
      <label for="account">ID : </label>
      <input id="account" type="text" v-model="account" />
    </div>
    <div>
      <label for="password">PW : </label>
      <input id="password" type="password" v-model="password" />
    </div>
    <div>
      <select v-model="company">
        <option value="none" selected disabled>회사를 선택하세요</option>
        <option value="company1">company1</option>
        <option value="company2">company2</option>
      </select>
    </div>
    <div>
      <button @click="loginClickHandler">로그인</button>
    </div>
  </div>
</template>
<script setup>
import router from '@/router'
import { ref } from 'vue'

const account = ref('')
const password = ref('')
const company = ref('none')

const loginClickHandler = () => {
  /* if (account.value === '' || password.value === '' || company.value === 'none') {
    alert('아이디와 비밀번호를 입력해주시고 회사를 선택해주세요.')
    return
  } */

  router.push('/home')
}
</script>
<style scoped></style>
