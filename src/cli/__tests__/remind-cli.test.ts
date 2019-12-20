import { main } from '../remind-cli';
import * as moment from 'moment';
import { existsSync, unlinkSync, copyFileSync, readFileSync } from 'fs';

describe('The CLI should display reminder if they exist', () => {
  let logOutput = '';
  let mockLog = (inputs: any) => (logOutput += inputs);
  beforeEach(() => {
    logOutput = '';
    console['log'] = jest.fn(mockLog);
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

    if (existsSync('./fixtures/three')) {
      unlinkSync('./fixtures/three');
    }

    expect(logOutput).toBe('\n');
  });
});

describe('The CLI should report errors in parameters', () => {
  let logOutput = '';
  const mockLog = (inputs: any) => (logOutput += inputs);
  let errorOutput = '';
  const mockError = (inputs: any) => (errorOutput += inputs);
  beforeEach(() => {
    logOutput = '';
    console['log'] = jest.fn(mockLog);
    errorOutput = '';
    console['error'] = jest.fn(mockError);
  });
  it('print usage when gets bad param', async () => {
    expect(await main('23', './fixtures/one', moment('2019-11-19').toDate())).toBe(1);
    expect(logOutput.startsWith('\nUSAGE\n')).toBeTruthy();
    expect(errorOutput).toBe('not correctly formatted');
  });
});

describe('The CLI should', () => {
  let logOutput = '';
  const mockLog = (inputs: any) => (logOutput += inputs);
  let errorOutput = '';
  const mockError = (inputs: any) => (errorOutput += inputs);
  beforeEach(() => {
    logOutput = '';
    console['log'] = jest.fn(mockLog);
    errorOutput = '';
    console['error'] = jest.fn(mockError);
  });
  it('add reminder', async () => {
    copyFileSync('./fixtures/one', './fixtures/temp');
    expect(await main('11 11 Vetrans Day', './fixtures/temp', moment('2019-11-19').toDate())).toBe(0);

    const expectFile = '2019 11 20 MW - sprint 1.0.43 to prod\n' + '11 23 Sunday\n' + '11 11 Vetrans Day\n';
    const newFile = readFileSync('./fixtures/temp', 'utf8');
    expect(newFile).toEqual(expectFile);

    if (existsSync('./fixtures/temp')) {
      unlinkSync('./fixtures/temp');
    }
    expect(logOutput).toBe('add reminder "11 11 Vetrans Day"');
    expect(errorOutput).toBe('');
  });
  it('add reminder and purge old reminders', async () => {
    copyFileSync('./fixtures/one', './fixtures/temp');
    expect(await main('11 11 Vetrans Day', './fixtures/temp', moment('2019-11-21').toDate())).toBe(0);

    const expectFile = '11 23 Sunday\n' + '11 11 Vetrans Day\n';
    const newFile = readFileSync('./fixtures/temp', 'utf8');
    expect(newFile).toEqual(expectFile);

    if (existsSync('./fixtures/temp')) {
      unlinkSync('./fixtures/temp');
    }
    expect(logOutput).toBe('add reminder "11 11 Vetrans Day"');
    expect(errorOutput).toBe('');
  });
});
