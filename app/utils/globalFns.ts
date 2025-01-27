/**
 *
 * @param number
 * @returns string
 * @description for formatting phone numbers - 234 9172 719 131
 */
export const formattedPhone = (number: string) =>
  number.replace(/^(\d{3})(\d{4})(\d{3})(\d{3})$/, '$1 $2 $3 $4');

/**
 *
 * @param str
 * @returns string
 * @description removes white space and slash from secure store encryp...
 */
export const serializeString = (str: string): string => {
  if (!str) return '';
  return str.replace(/["\s]+/g, '');
};

/**
 *
 * @param date
 * @returns string dd,mm,yyyy
 */
export function convertDate(date: Date): string {
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;
  const year = date.getUTCFullYear();

  const dayString = day < 10 ? `0${day}` : day.toString();
  const monthString = month < 10 ? `0${month}` : month.toString();

  return `${dayString},${monthString},${year}`;
}
