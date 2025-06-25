import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear';
dayjs.extend(isLeapYear);

export function isMoreThanMaximumMonthAndYear(
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

export function isLessThanTen(
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

export function inputDateByProp(
  dateFormInput: string[],
  index: number,
  key: string
): string {
  return Number(dateFormInput[index]) > 10 && key !== 'year'
    ? dateFormInput[index]
    : key === 'year'
      ? '0'.repeat(4 - dateFormInput[index].length) +
        dateFormInput[index]
      : '0' + dateFormInput[index];
}

export function isLessThanMinOrIsMoreThanMax(
  dateInput: Date,
  minDate: string,
  maxDate: string
): boolean {
  const minDateTypeDate = new Date(minDate);
  const maxDateTypeDate = new Date(maxDate);
  return (
    dateInput < minDateTypeDate ||
    dateInput > maxDateTypeDate
  );
}
