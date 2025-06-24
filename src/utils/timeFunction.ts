export function isMoreThanMaximumTime(
  hour: string,
  minute: string
): boolean {
  return Number(hour) > 23 || Number(minute) > 59;
}

export function setDefaultByTimeUnit(
  timeUnit: string
): string {
  return timeUnit === 'hour' ? 'HH' : 'mm';
}

export function isMoreThanMaximumTwelveTime(
  hour: string,
  minute: string
): boolean {
  return Number(hour) > 12 || Number(minute) > 59;
}

export function setMeridiemType(meridiem: string): string {
  return (meridiem ?? '').toLowerCase() === 'p'
    ? 'PM'
    : (meridiem ?? '').toLowerCase() === 'a'
      ? 'AM'
      : 'aa';
}

export function calculateHour(
  meridiem: string,
  hour: string
): number {
  return meridiem === 'PM'
    ? Number(hour) === 12
      ? Number(hour)
      : Number(hour) + 12
    : Number(hour) === 12
      ? 0
      : Number(hour);
}
