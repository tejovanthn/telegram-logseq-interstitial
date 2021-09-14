import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone.js"
import utc from "dayjs/plugin/utc.js"
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault(process.env.TIMEZONE)

export const getFileName = (dateInt) => `journals/${dayjs.tz(dateInt * 1000).format("YYYY_MM_DD")}.md`

export const getTimeStamp = (dateInt) => dayjs.tz(dateInt * 1000).format("HH:mm")
