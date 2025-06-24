import { isNil, isNaN } from 'lodash';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

const timezoneThai = 'Asia/Bangkok';

function formatSpace(form: string, space: number): string {
  return `${' '.repeat(space)}${form}${' '.repeat(space)}`;
}

export function formatDate(
  date: Date,
  formatForm: string,
  space: number
) {
  const formWithSpace = formatSpace(formatForm, space);
  return !isNil(date) && !isNaN(date.getTime())
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

export function formatDateWithMeridiemTime(
  date: Date,
  formatForm: string,
  space: number
) {
  const formWithSpace = formatSpace(formatForm, space);
  return !isNil(date)
    ? dayjs(date)
        .tz(timezoneThai)
        .format(
          `DD${formWithSpace}MM${formWithSpace}YYYY h:mm A`
        )
    : '';
}

export function formatDateWithTime(
  date: Date,
  formatForm: string,
  space: number
) {
  const formWithSpace = formatSpace(formatForm, space);
  return !isNil(date) && !isNaN(date.getTime())
    ? dayjs(date)
        .tz(timezoneThai)
        .format(
          `DD${formWithSpace}MM${formWithSpace}YYYY HH:mm`
        )
    : '';
}

export function formatDateFullMonthWithTime(date: Date) {
  return !isNil(date)
    ? dayjs(date)
        .tz(timezoneThai)
        .format('D MMMM YYYY, HH:mm A')
    : '';
}
