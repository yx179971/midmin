<script setup lang="ts">
import { userApi } from '@/api/user.ts'
import { onMounted } from 'vue'

onMounted(async () => {
  await userApi.list()
})
</script>

<template>
  <div>User List View</div>
</template>

<style scoped>

</style>
