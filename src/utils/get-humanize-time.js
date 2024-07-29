import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(duration)
dayjs.extend(relativeTime)

const getHumanizeTime = (from_date_iso_string, to_date_iso_string) => {
	const toDate = !!to_date_iso_string ? dayjs(to_date_iso_string) : dayjs()
	return dayjs.duration(dayjs(from_date_iso_string).diff(toDate, 'months'), 'months').humanize()
}
export default getHumanizeTime
