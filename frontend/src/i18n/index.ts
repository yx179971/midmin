import { createI18n } from 'vue-i18n'
import zh from '@/i18n/locales/zh.ts'
import en from '@/i18n/locales/en.ts'

export const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: {
    en,
    zh
  }
})
