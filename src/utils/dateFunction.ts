import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(isLeapYear);

export function checkMoreThanMaximumMonthAndYear(
  month: string,
  year: string
): boolean {
  return (
    Number(month) > 12 || String(Number(year)).length > 4
  );
}

export function isMoreThanMaximumDays(
  day: string,
  month: string,
  date: Date | undefined
): boolean {
  let maximumDate = 31;
  if ([4, 6, 9, 11].includes(Number(month))) {
    maximumDate = 30;
  } else if (Number(month) === 2) {
    maximumDate = dayjs(date).isLeapYear() ? 29 : 28;
  }
  return Number(day) > maximumDate;
}

export function checkLessThanTen(
  inputNumber: string | undefined
): boolean {
  return (
    Number(inputNumber) < 10 || isNaN(Number(inputNumber))
  );
}

export function setDefaultByDateUnit(
  dateUnit: string
): string {
  return dateUnit === 'day'
    ? 'DD'
    : dateUnit === 'month'
      ? 'MM'
      : 'YYYY';
}
