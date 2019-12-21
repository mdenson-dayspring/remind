# @dayspringtech/remind

```
NAME

    remind -- print reminders of upcoming events

USAGE

    remind -- show reminders for next seven days
    remind [year] month day message -- add reminder to database

DESCRIPTION

    Remind maintains a database of reminders in the .reminders file,
    in the user's home directory, each a single line of the form

        [year] month day message

    Year is optional, and must be an integer greater than 99; if no
    year is given, the reminder applies to all years (for instance,
    birthdays).

    If remind is called with no arguments, it writes to standard
    output all reminders that occur within the next seven days. If
    remind is called with arguments giving a date and message, a
    reminder is added to the database. Any time remind is called,
    all past reminders are deleted from the database.

EXAMPLE

    $ date
    Sun Jun 30 19:45:38 CDT 2019
    $ remind 4 2 Anne birthday
    $ remind 10 13 Kate birthday
    $ remind 7 4 Independence Day
    $ remind 2019 7 2 lunch with Pat
    $ remind 2019 5 13 dentist 2:00pm
    $ remind
    7 4 Independence Day
    2019 7 2 lunch with Pat
    $ cat ./reminders
    4 2 Anne birthday
    10 13 Kate birthday
    7 4 Independence Day
    2019 7 2 lunch with Pat
```

# Install to use
```
$ sudo npm i -g @dayspringpartners/remind
```

# Development instructions

## Install for development
```
$ git clone ....
$ npm install
```

## Start testing with watch
```
$ npm run test:watch
```

## Test, Lint and format
```
$ npm run test
$ npm run lint
$ npm run format
```

## increment version (up-to-date working directory)
```
$ npm verion patch|minor|major
```

## publish new version to npm
```
# have an up-to-date working directory
$ npm verion patch|minor|major
$ npm login
$ npm publish
```
