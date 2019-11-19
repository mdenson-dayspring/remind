import { addReminder, daynum, purge, Reminder } from '../index';

test('purge old none to purge', () => {
  const i = "12 6 Tiffany's birthday\n 1 6 Epiphany\n2019 11 19 Education Day 2019\n";
  const today = daynum(2019, 10, 31);
  const e = [
    { month: 12, day: 6, message: "Tiffany's birthday" } as Reminder,
    { month: 1, day: 6, message: 'Epiphany' } as Reminder,
    { year: 2019, month: 11, day: 19, message: 'Education Day 2019' } as Reminder
  ];
  expect(purge(i, today)).toEqual(e);
});
test('purge old remove one', () => {
  const i = "12 6 Tiffany's birthday\n 1 6 Epiphany\n2019 11 19 Education Day 2019\n";
  const today = daynum(2019, 12, 31);
  const e = [
    { month: 12, day: 6, message: "Tiffany's birthday" } as Reminder,
    { month: 1, day: 6, message: 'Epiphany' } as Reminder
  ];
  expect(purge(i, today)).toEqual(e);
});

test('add reminder', () => {
  const inReminder = { month: 1, day: 1, message: 'New Year' } as Reminder;
  const inAccum = [
    { month: 12, day: 6, message: "Tiffany's birthday" } as Reminder,
    { month: 1, day: 6, message: 'Epiphany' } as Reminder
  ];
  const expectAccum = [
    { month: 12, day: 6, message: "Tiffany's birthday" } as Reminder,
    { month: 1, day: 6, message: 'Epiphany' } as Reminder,
    { month: 1, day: 1, message: 'New Year' } as Reminder
  ];
  expect(addReminder(inAccum, inReminder)).toEqual(expectAccum);
});
