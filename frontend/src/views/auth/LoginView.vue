<script setup lang="ts">
import { useStore } from '@/stores'

const store = useStore()

const username = ref('');
const password = ref('');

const handleLogin = async () => {
  console.log('Logging in with', username.value, password.value);
  await store.login(username.value, password.value);
};

const handleLogout = async () => {
  console.log('Logging out');
  await store.logout();
};
</script>

<template>
  <div>Login View</div>
  <el-input v-model="username" placeholder="Username"></el-input>
  <el-input v-model="password" placeholder="Password" type="password"></el-input>
  <el-button @click="handleLogin">Login</el-button>
  <el-button @click="handleLogout">Logout</el-button>
</template>

<style scoped>

</style>
