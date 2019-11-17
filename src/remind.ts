import { daynum, daynumToYear } from './daynum';

export class Reminder {
  public year?: number;
  public month!: number;
  public day!: number;
  public message!: string;
}

export const parser = (text: string): Reminder[] => {
  const lines = text.split('\n');
  const records = [] as Reminder[];
  lines.forEach(line => {
    const fields = line.trim().split(' ');
    if (fields.length > 1) {
      let i = 0;
      let y = 0;
      let m = 0;
      let d = 0;
      y = parseInt(fields[i], 10);
      if (y > 99) {
        m = parseInt(fields[++i], 10);
      } else {
        m = y;
        y = 0;
      }
      d = parseInt(fields[++i], 10);

      const r = {} as Reminder;
      if (y) {
        r.year = y;
      }
      r.month = m;
      r.day = d;
      r.message = fields.slice(++i).join(' ');
      records.push(r);
    }
  });
  return records;
};

export const toText = (list: Reminder[]): string => {
  const lines = list.map(rem => {
    let line = rem.month + ' ' + rem.day + ' ' + rem.message;
    if (rem.year) {
      line = rem.year + ' ' + line;
    }
    return line;
  });
  return lines.join('\n') + '\n';
};

export const todaysReminders = (text: string, today: number): Reminder[] => {
  const year = daynumToYear(today);
  return parser(text).filter(reminder => {
    let dn = 0;
    if (reminder.year) {
      dn = daynum(reminder.year, reminder.month, reminder.day);
    } else {
      dn = daynum(year, reminder.month, reminder.day);
      if (dn < today) {
        dn = daynum(year + 1, reminder.month, reminder.day);
      }
    }
    return today <= dn && dn < today + 7;
  });
};

export const purge = (text: string, today: number): Reminder[] => {
  return parser(text).filter(reminder => {
    let ret = true;
    if (reminder.year) {
      ret = today < daynum(reminder.year, reminder.month, reminder.day);
    }
    return ret;
  });
};
