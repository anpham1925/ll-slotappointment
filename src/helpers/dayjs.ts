import * as coreDayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as customParseFormat from 'dayjs/plugin/customParseFormat';

coreDayjs.extend(utc);
coreDayjs.extend(customParseFormat);
export const dayjs = coreDayjs;

export const getStartAndEndOfDay = (date: string, format: string) => {
  const startOfDay = dayjs(date, format).startOf('day');
  const endOfDay = dayjs(date, format).endOf('day');
  return { startOfDay, endOfDay };
};
