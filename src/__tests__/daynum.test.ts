import { dateToDaynum, daynum, daynumToYear } from '../index';
import * as moment from 'moment';

test('daynum calcs', () => {
  expect(daynum(1970, 1, 1)).toEqual(1);
  expect(daynum(2018, 12, 31)).toEqual(17897);
  expect(daynum(2019, 1, 1)).toEqual(17897 + 1);
  expect(daynum(2019, 2, 1)).toEqual(17897 + 31 + 1);
  expect(daynum(2019, 3, 1)).toEqual(17897 + 31 + 28 + 1);
  expect(daynum(2019, 12, 31)).toEqual(17897 + 365);
  expect(daynum(2020, 1, 1)).toEqual(17897 + 365 + 1);
  expect(daynum(2020, 3, 1)).toEqual(17897 + 365 + 31 + 29 + 1);
  expect(daynum(2020, 12, 31)).toEqual(17897 + 365 + 366);
  expect(daynum(2021, 1, 1)).toEqual(17897 + 365 + 366 + 1);
  expect(daynum(2021, 3, 1)).toEqual(17897 + 365 + 366 + 31 + 28 + 1);
  expect(daynum(2021, 12, 31)).toEqual(17897 + 365 + 366 + 365);
});

test('daynum calcs from date', () => {
  expect(dateToDaynum(moment('2019-11-19').toDate())).toEqual(daynum(2019, 11, 19));
  expect(dateToDaynum(moment('2020-03-12').toDate())).toEqual(daynum(2020, 3, 12));
});

test('daynum reverse calcs', () => {
  expect(daynumToYear(1)).toEqual(1970);
  expect(daynumToYear(365)).toEqual(1970);
  expect(daynumToYear(365 + 1)).toEqual(1971);
  expect(daynumToYear(365 + 365)).toEqual(1971);
  expect(daynumToYear(365 + 365 + 1)).toEqual(1972);
  expect(daynumToYear(365 + 365 + 366)).toEqual(1972);
  expect(daynumToYear(365 + 365 + 366 + 1)).toEqual(1973);
  expect(daynumToYear(365 + 365 + 366 + 365)).toEqual(1973);
  expect(daynumToYear(17897)).toEqual(2018);
  expect(daynumToYear(17897 + 1)).toEqual(2019);
  expect(daynumToYear(17897 + 31 + 1)).toEqual(2019);
  expect(daynumToYear(17897 + 31 + 28 + 1)).toEqual(2019);
  expect(daynumToYear(17897 + 365)).toEqual(2019);
  expect(daynumToYear(17897 + 365 + 1)).toEqual(2020);
  expect(daynumToYear(17897 + 365 + 31 + 29 + 1)).toEqual(2020);
  expect(daynumToYear(17897 + 365 + 366)).toEqual(2020);
  expect(daynumToYear(17897 + 365 + 366 + 1)).toEqual(2021);
  expect(daynumToYear(17897 + 365 + 366 + 31 + 28 + 1)).toEqual(2021);
  expect(daynumToYear(17897 + 365 + 366 + 365)).toEqual(2021);
});
