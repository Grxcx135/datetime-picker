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

export function inputTimeByProp(
  timeFromInput: string[],
  index: number
) {
  return !isNaN(Number(timeFromInput[index]))
    ? Number(timeFromInput[index]) > 10
      ? timeFromInput[index]
      : '0' + timeFromInput[index]
    : timeFromInput[index];
}

export function isLessThanMinTimeOrMoreThanMaxTime(
  hour: string,
  minute: string,
  minTime: string,
  maxTime: string
) {
  console.log('TODO : bug cal ไวเกิน');
  if (hour === 'HH' || minute === 'mm') {
    console.log('in if', hour, minute);
    return false;
  }
  const inputTime = Number(hour) + Number(minute) * 0.01;
  return maxTime
    ? inputTime < Number(minTime) ||
        inputTime > Number(maxTime)
    : false;
}
