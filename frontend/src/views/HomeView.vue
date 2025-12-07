<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const change = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
}
</script>

<template>
  <main>
    <HelloWorld :msg="$t('d.dd.ddd')" />
<!--    <HelloWorld :msg="$t('message.hello')" />-->
    <el-card>
      <el-button @click="change">切换语言（Switch Language）</el-button>

      <div style="margin-top: 20px;">
        <el-date-picker type="date" placeholder="请选择日期" />
      </div>

      <div style="margin-top: 20px;">
        <el-pagination :total="200" :page-size="10" />
      </div>
    </el-card>
  </main>
</template>
