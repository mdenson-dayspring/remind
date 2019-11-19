#!/usr/bin/env node

import { homedir } from 'os';
import { main } from './remind-cli';
/* tslint:disable */
import * as moment from 'moment';
/* tslint:enable */

main(process.argv.slice(2).join(' '), homedir() + '/.reminders', moment().toDate()).then(ret =>
  ret > 0 ? process.exit(ret) : process.exit()
);
