export function checkMoreThanMaximumTime(
  hour: string,
  minute: string
): boolean {
  return Number(hour) > 24 || Number(minute) > 60;
}

export function setDefaultByTimeUnit(
  timeUnit: string
): string {
  return timeUnit === 'hour' ? 'HH' : 'mm';
}
