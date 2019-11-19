#!/usr/bin/env node

import { main } from './remind-cli';
import * as moment from 'moment';
import { homedir } from 'os';

main(process.argv.slice(2).join(' '), homedir() + '/.reminders', moment().toDate())
  .then(ret => ret > 0 ? process.exit(ret) : process.exit());

