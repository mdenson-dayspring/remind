import { daynum, Reminder, todaysReminders } from '../index';

describe('filter next seven days (one time reminder)', () => {
  it('item 2 days away (should return 1)', () => {
    const i = "12 6 Tiffany's birthday\n 5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const today = daynum(2019, 11, 17);
    const e = [{ year: 2019, month: 11, day: 19, message: 'Education Day 2019' } as Reminder];
    expect(todaysReminders(i, today)).toEqual(e);
  });
  it('item 7 days away (should return 1)', () => {
    const i = "12 6 Tiffany's birthday\n 5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const today = daynum(2019, 11, 13);
    const e = [{ year: 2019, month: 11, day: 19, message: 'Education Day 2019' } as Reminder];
    expect(todaysReminders(i, today)).toEqual(e);
  });
  it('item 8 days away (should return none)', () => {
    const i = "12 6 Tiffany's birthday\n 5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const today = daynum(2019, 11, 12);
    const e = [] as Reminder[];
    expect(todaysReminders(i, today)).toEqual(e);
  });
});

describe('filter next seven days (repeating reminder)', () => {
  it('item in 7 days (should return 1)', () => {
    const i = "12 6 Tiffany's birthday\n 5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const today = daynum(2019, 11, 30);
    const e = [{ month: 12, day: 6, message: "Tiffany's birthday" } as Reminder];
    expect(todaysReminders(i, today)).toEqual(e);
  });
  it('1 item in 8 days (should return none)', () => {
    const i = "12 6 Tiffany's birthday\n 5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const today = daynum(2019, 11, 29);
    const e = [] as Reminder[];
    expect(todaysReminders(i, today)).toEqual(e);
  });

  it('1 item in 7 days, first week of Jan special case (should return 1)', () => {
    const i = "12 6 Tiffany's birthday\n 1 6 Epiphany\n2019 11 19 Education Day 2019\n";
    const today = daynum(2019, 12, 31);
    const e = [{ month: 1, day: 6, message: 'Epiphany' } as Reminder];
    expect(todaysReminders(i, today)).toEqual(e);
  });
});
