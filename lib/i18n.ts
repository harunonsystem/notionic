export const i18nConfig = {
  locales: ['ja', 'en'] as const,
  defaultLocale: 'ja'
} as const

export type Locale = (typeof i18nConfig.locales)[number]
