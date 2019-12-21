import { main } from '../remind-cli';
import * as moment from 'moment';
import { existsSync, unlinkSync, copyFileSync, readFileSync } from 'fs';

let logOutput = '';
let errorOutput = '';
let mockLog = (inputs: any) => (logOutput += inputs);
const mockError = (inputs: any) => (errorOutput += inputs);

beforeAll(() => {
  console['log'] = jest.fn(mockLog);
  console['error'] = jest.fn(mockError);
});

describe('The CLI should display reminder if they exist', () => {
  beforeEach(() => {
    logOutput = '';
  });
  it('should print reminders', async () => {
    expect(await main('', './fixtures/one', moment('2019-11-19').toDate())).toBe(0);
    expect(logOutput.startsWith('2019 11 20')).toBeTruthy();
  });
  it('should print newline if no reminder found', async () => {
    expect(await main('', './fixtures/two', moment('2019-11-19').toDate())).toBe(0);
    expect(logOutput).toBe('\n');
  });
  it('should create blank file if it did not exist', async () => {
    expect(await main('', './fixtures/three', moment('2019-11-19').toDate())).toBe(0);

    // expect the file to be created and blank
    const fileExists = existsSync('./fixtures/three');
    expect(fileExists).toBeTruthy();
    if (fileExists) {
      const newFile = readFileSync('./fixtures/three', 'utf8');
      unlinkSync('./fixtures/three');
      expect(newFile).toBe('');
    }

    expect(logOutput).toBe('\n');
  });
});

describe('The CLI should report errors in parameters', () => {
  beforeEach(() => {
    logOutput = '';
    errorOutput = '';
  });
  it('print usage when gets bad param', async () => {
    expect(await main('23', './fixtures/one', moment('2019-11-19').toDate())).toBe(1);
    expect(logOutput.startsWith('\nUSAGE\n')).toBeTruthy();
    expect(errorOutput).toBe('not correctly formatted');
  });
});

describe('The CLI should', () => {
  beforeEach(() => {
    logOutput = '';
    errorOutput = '';
  });
  it('add reminder', async () => {
    copyFileSync('./fixtures/one', './fixtures/temp');
    expect(await main('11 11 Vetrans Day', './fixtures/temp', moment('2019-11-19').toDate())).toBe(0);
    const newFile = readFileSync('./fixtures/temp', 'utf8');
    if (existsSync('./fixtures/temp')) {
      unlinkSync('./fixtures/temp');
    }

    const expectFile = '2019 11 20 MW - sprint 1.0.43 to prod\n' + '11 23 Sunday\n' + '11 11 Vetrans Day\n';
    expect(newFile).toEqual(expectFile);
    expect(logOutput).toBe('add reminder "11 11 Vetrans Day"');
    expect(errorOutput).toBe('');
  });
  it('add reminder and purge old reminders', async () => {
    copyFileSync('./fixtures/one', './fixtures/temp');
    expect(await main('11 11 Vetrans Day', './fixtures/temp', moment('2019-11-21').toDate())).toBe(0);
    const newFile = readFileSync('./fixtures/temp', 'utf8');
    if (existsSync('./fixtures/temp')) {
      unlinkSync('./fixtures/temp');
    }

    const expectFile = '11 23 Sunday\n' + '11 11 Vetrans Day\n';
    expect(newFile).toEqual(expectFile);
  });
});
