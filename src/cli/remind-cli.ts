import {
  addReminder,
  dateToDaynum,
  getFileContents,
  parser,
  print,
  printError,
  todaysReminders,
  toText,
  writeFileContents
} from '../index';
import { purge } from '../remind';

export const main = async (param: string, filename: string, date: Date): Promise<number> => {
  if (param.length > 0) {
    if (param.match(/^-{0,2}(help|h)/)) {
      printHelp();
      return 0;
    } else if (!param.match(/^(\d{3,4} )*\d{1,2} \d{1,2} .+$/)) {
      printError('not correctly formatted');
      printUsage();
      return 1;
    } else {
      print('add reminder "' + param + '"');
      try {
        const remindersText = await getFileContents(filename);

        const newDB = addReminder(purge(remindersText, dateToDaynum(date)), parser(param)[0]);
        return writeFileContents(filename, toText(newDB));
      } catch (e) {
        printError('Could not read reminders file.');
        return 1;
      }
    }
  } else {
    try {
      const remindersText = await getFileContents(filename);
      const today = dateToDaynum(date);
      print(toText(todaysReminders(remindersText, today)));
      return 0;
    } catch (e) {
      printError('Could not read reminders file.');
      return 1;
    }
  }
};

const printHelp = () => {
  const manual =
    '\nNAME' +
    '\n' +
    '\n    remind -- print reminders of upcoming events' +
    '\n' +
    '\nUSAGE' +
    '\n' +
    '\n    remind -- show reminders for next seven days' +
    '\n    remind [year] month day message -- add reminder to database' +
    '\n' +
    '\nDESCRIPTION' +
    '\n' +
    '\n    Remind maintains a database of reminders in the .reminders file,' +
    "\n    in the user's home directory, each a single line of the form" +
    '\n' +
    '\n        [year] month day message' +
    '\n' +
    '\n    Year is optional, and must be an integer greater than 99; if no' +
    '\n    year is given, the reminder applies to all years (for instance,' +
    '\n    birthdays).' +
    '\n' +
    '\n    If remind is called with no arguments, it writes to standard' +
    '\n    output all reminders that occur within the next seven days. If' +
    '\n    remind is called with arguments giving a date and message, a' +
    '\n    reminder is added to the database. Any time remind is called,' +
    '\n    all past reminders are deleted from the database.' +
    '\n' +
    '\nEXAMPLE' +
    '\n' +
    '\n    $ date' +
    '\n    Sun Jun 30 19:45:38 CDT 2019' +
    '\n    $ remind 4 2 Anne birthday' +
    '\n    $ remind 10 13 Kate birthday' +
    '\n    $ remind 7 4 Independence Day' +
    '\n    $ remind 2019 7 2 lunch with Pat' +
    '\n    $ remind 2019 5 13 dentist 2:00pm' +
    '\n    $ remind' +
    '\n    7 4 Independence Day' +
    '\n    2019 7 2 lunch with Pat' +
    '\n    $ cat ./reminders' +
    '\n    4 2 Anne birthday' +
    '\n    10 13 Kate birthday' +
    '\n    7 4 Independence Day' +
    '\n    2019 7 2 lunch with Pat' +
    '\n';
  print(manual);
};
const printUsage = () => {
  const usage =
    '\nUSAGE' +
    '\n  remind -- show reminders for next seven days' +
    '\n  remind [year] month day message -- add reminder to database' +
    '\n  remind help -- show manual' +
    '\n';
  print(usage);
};
