import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { BLOG } from '@/blog.config'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(BLOG.timezone)

export default dayjs
