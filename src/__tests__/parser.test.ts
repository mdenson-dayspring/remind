import { parser, Reminder, toText } from '../index';

describe('String manipulation should', () => {
  it('parse text to Reminder', () => {
    const i = "12 6 Tiffany's birthday\n 5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const e = [
      { month: 12, day: 6, message: "Tiffany's birthday" } as Reminder,
      { month: 5, day: 19, message: "Matt's birthday" } as Reminder,
      { year: 2019, month: 11, day: 19, message: 'Education Day 2019' } as Reminder
    ];
    expect(parser(i)).toEqual(e);
  });

  it('format reminder as text', () => {
    const e = "12 6 Tiffany's birthday\n5 19 Matt's birthday\n2019 11 19 Education Day 2019\n";
    const i = [
      { month: 12, day: 6, message: "Tiffany's birthday" } as Reminder,
      { month: 5, day: 19, message: "Matt's birthday" } as Reminder,
      { year: 2019, month: 11, day: 19, message: 'Education Day 2019' } as Reminder
    ];
    expect(toText(i)).toEqual(e);
  });
});
