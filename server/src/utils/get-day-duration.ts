export function getDayDuration($start: string, $end: string) {
  let start = new Date($start);
  let end = new Date($end);
  let difference = end.getTime() - start.getTime();

  let days = Math.ceil(difference / (1000 * 60 * 60 * 24));
  return days;
}
