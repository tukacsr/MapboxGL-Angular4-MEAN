# MEAN 4 Mapbox-GL Starter (Angular 4)

This project creates a startes package for Mapbox-GL application used with MEAN stack.
Node backend with mongodb and express had been set up, you need to change the test database to yours.
On frontend Angular 4 is used with Mapbox-GL.
The map contains a simple login without authorization, the user is able to add markers and comments to the map.
Further development is possible with the Mapbox-GL API.

## Usage

1. Install Mongodb
2. Run `npm install` to install packages
2. Create a database on mLab.com and change the test database to yours in `server.js`
3. Run `node server.js` to start the API on `http://localhost:3001/api/comments`
4. Run `ng serve` to run the application on `http://localhost:4200/`


# Further development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
