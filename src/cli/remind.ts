#!/usr/bin/env node

import { homedir } from 'os';
import { main } from './remind-cli';

import * as moment from 'moment';

main(process.argv.slice(2).join(' '), homedir() + '/.reminders', moment().toDate()).then(ret =>
  ret > 0 ? process.exit(ret) : process.exit()
);
