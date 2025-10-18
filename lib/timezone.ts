import { BLOG } from '@/blog.config'

export const dateToUnixTimestamp = (
  dateStr: string | number | null | undefined,
  timezone?: string
): number | null => {
  if (!dateStr) {
    return null
  }

  try {
    const date = new Date(dateStr)

    if (Number.isNaN(date.getTime())) {
      return null
    }

    if (timezone) {
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      })

      const parts = formatter.formatToParts(date)
      const partsMap = Object.fromEntries(
        parts.map(({ type, value }) => [type, value])
      )

      const adjustedDate = new Date(
        `${partsMap.year}-${partsMap.month}-${partsMap.day}T${partsMap.hour}:${partsMap.minute}:${partsMap.second}Z`
      )

      return adjustedDate.getTime()
    }

    return date.getTime()
  } catch (error) {
    console.error(`Failed to parse date: ${dateStr}`, error)
    return null
  }
}

export const formatDateWithTimezone = (
  dateStr: string,
  locale: string = 'ja-JP'
): string => {
  try {
    const date = new Date(dateStr)

    if (Number.isNaN(date.getTime())) {
      console.error(`Invalid date: ${dateStr}`)
      return ''
    }

    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: BLOG.timezone
    })
  } catch (error) {
    console.error(`Failed to format date: ${dateStr}`, error)
    return ''
  }
}
