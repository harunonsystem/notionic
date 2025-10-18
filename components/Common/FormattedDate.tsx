import { formatDateWithTimezone } from '@/lib/timezone'

export default function FormattedDate({ date }: { date: string }) {
  return <span>{formatDateWithTimezone(date)}</span>
}
