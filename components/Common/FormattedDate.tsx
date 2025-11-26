import { formatDateWithTimezone } from '@/lib/timezone'

export default function FormattedDate({ date }: { date: string | number }) {
  // Convert Unix timestamp to ISO string if needed
  const dateStr = typeof date === 'number' ? new Date(date).toISOString() : date
  return <span>{formatDateWithTimezone(dateStr)}</span>
}
