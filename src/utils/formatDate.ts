import { isNil } from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const timezoneThai = 'Asia/Bangkok';

export function formatDate(
  date: Date,
  formatForm: string,
  space: number
) {
  const formWithSpace = `${' '.repeat(space)}${formatForm}${' '.repeat(space)}`;
  return !isNil(date)
    ? dayjs(date)
        .tz(timezoneThai)
        .format(`DD${formWithSpace}MM${formWithSpace}YYYY`)
    : '';
}

export function formatDateStartWithYear(date: Date) {
  return !isNil(date)
    ? dayjs(date).tz(timezoneThai).format('YYYY-MM-DD')
    : '';
}

export function formatDateDashWithTime(date: Date) {
  return !isNil(date)
    ? dayjs(date)
        .tz(timezoneThai)
        .format('DD-MM-YYYY h:mm A')
    : '';
}

export function formatDateWithTime(date: Date) {
  return !isNil(date)
    ? dayjs(date)
        .tz(timezoneThai)
        .format('DD/MM/YYYY [Time] HH:mm')
    : '';
}

export function formatDateFullMonthWithTime(date: Date) {
  return !isNil(date)
    ? dayjs(date)
        .tz(timezoneThai)
        .format('D MMMM YYYY, HH:mm A')
    : '';
}
