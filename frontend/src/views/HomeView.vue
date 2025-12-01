<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { userApi } from '@/api/user.ts'
import { onMounted, ref } from 'vue'

const user = ref<{
  name: string
}>({ name: '' })
const getUser = async () => {
  user.value = await userApi.getUser()
}
onMounted(() => {
  getUser()
  console.log(user.value)
})
</script>

<template>
  <main>
    <div>
      {{ user }}
    </div>
    <!--    <TheWelcome />-->
  </main>
</template>
