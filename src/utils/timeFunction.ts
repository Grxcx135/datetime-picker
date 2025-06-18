export function checkMoreThanMaximumTime(
  hour: string,
  minute: string
): boolean {
  return Number(hour) > 24 || Number(minute) > 60;
}
