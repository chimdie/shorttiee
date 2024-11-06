import cols from 'tailwindcss/colors';
import colors from '@/colors';

export type ShorttieeColors = keyof typeof colors;

export const getColor = (key: ShorttieeColors) => {
  return colors[key] || (cols[key as keyof typeof cols] as never);
};
