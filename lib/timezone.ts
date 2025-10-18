import { BLOG } from '@/blog.config'

export const dateToUnixTimestamp = (dateStr: string | number): number => {
  const date = new Date(dateStr)
  return date.getTime()
}

export const formatDateWithTimezone = (
  dateStr: string,
  locale: string = 'ja-JP'
): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: BLOG.timezone
  })
}
