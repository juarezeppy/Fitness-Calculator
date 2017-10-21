# Project Overview

Buddy Up is a health and fitness calculator feature. Users can login to view their fitness dashboard (in progress) or simply toggle though the calculators and enter their data and calculate their bmi, bmr, tdee, or 1 rep max for a set of excercies. Their results are displayed in text boxes AND in a histogram chart against other user data in the database.

Database is: Google Realtime Database (nosql).

API: myexternalip api to retrieve unathenticated users ip address to register their data in the database. This prevents a single user from enter dozens of calculations and storing multiple instances of data while not logged in.

Charts: D3 histogram using ngx charts.

Cloud Functions: These cloud functions act as triggers which are executed by an HTTP chron job which compiles user inputed data in the database. These cloud functions keep the chart data "up to date" by being run once a day at a predetermined time. Note: The data in the DB is "dummy" data that I inputed until the site goes live and gets data from real users.

# WebpackTest

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
