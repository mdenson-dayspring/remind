import { main } from '../remind-cli';
import * as moment from 'moment';
import { existsSync, unlinkSync, copyFileSync, readFileSync } from 'fs';

test('cli no error', async () => {
  expect(await main('', './fixtures/one', moment('2019-11-19').toDate())).toBe(0);
});
test('cli no error empty', async () => {
  expect(await main('', './fixtures/two', moment('2019-11-19').toDate())).toBe(0);
});
test('cli no error no file', async () => {
  expect(await main('', './fixtures/three', moment('2019-11-19').toDate())).toBe(0);

  if (existsSync('./fixtures/three')) {
    unlinkSync('./fixtures/three');
  }
});

test('cli bad param', async () => {
  expect(await main('23', './fixtures/one', moment('2019-11-19').toDate())).toBe(1);
});

test('cli add reminder', async () => {
  copyFileSync('./fixtures/one', './fixtures/temp')
  expect(await main('11 11 Vetrans Day', './fixtures/temp', moment('2019-11-19').toDate())).toBe(0);

  const expectFile =
    "2019 11 20 MW - sprint 1.0.43 to prod\n" +
    "11 23 Sunday\n" +
    "11 11 Vetrans Day\n";
  const newFile = readFileSync('./fixtures/temp', 'utf8');
  expect(newFile).toEqual(expectFile);

  if (existsSync('./fixtures/temp')) {
    unlinkSync('./fixtures/temp');
  }
});
test('cli add with a purge', async () => {
  copyFileSync('./fixtures/one', './fixtures/temp')
  expect(await main('11 11 Vetrans Day', './fixtures/temp', moment('2019-11-21').toDate())).toBe(0);

  const expectFile =
    "11 23 Sunday\n" +
    "11 11 Vetrans Day\n";
  const newFile = readFileSync('./fixtures/temp', 'utf8');
  expect(newFile).toEqual(expectFile);

  if (existsSync('./fixtures/temp')) {
    unlinkSync('./fixtures/temp');
  }
});
