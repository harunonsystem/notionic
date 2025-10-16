export default function FormattedDate({ date }: { date: string }) {
  // Simple date formatting without heavy dependencies
  const formattedDate = new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return <span>{formattedDate}</span>
}
