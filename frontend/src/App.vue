<template>
  <el-config-provider :locale="elementLocale">
    <RouterView />
  </el-config-provider>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
import type { Ref } from 'vue'
export type AppLocale = 'zh' | 'en'

const elementLocales: Record<AppLocale, typeof zhCn|typeof en> = {
  zh: zhCn,
  en
}
const { locale } = useI18n<{ locale: AppLocale }>()
const typedLocale = locale as unknown as Ref<AppLocale>

const elementLocale = computed(() => {
  return elementLocales[typedLocale.value]
})
</script>
