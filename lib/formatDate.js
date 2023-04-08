export default function formatDate(date, local) {
  const d = new Date(date)
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'Asia/Tokyo' }
  return d.toLocaleDateString('ja-JP', options)
}
