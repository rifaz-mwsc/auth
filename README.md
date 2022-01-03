# HrDeskNg8

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.24.



### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.



## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.



## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).



## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).



## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


### WebApps- Build Commands

```shell
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=dev01 --aot --build-optimizer --output-path=devBuild/dev01
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=dev02 --aot --build-optimizer --output-path=devBuild/dev02
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=developer --aot --build-optimizer --output-path=devBuild/dev
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=demo --aot --build-optimizer --output-path=devBuild/demo
    node --max_old_space_size=4096 node_modules/@angular/cli/bin/ng build --environment=prod --aot --build-optimizer --output-path=devBuild/prod
```


### Ng6 Config

```shell
    ng serve --configuration=local
    ng serve -c local
```


### You can try:
```shell
    ng serve --configuration=dev/prod
```


### To build use:

```shell
    ng build --prod --base-href / Your Application Name/
    ng build --base-href "/webapps-v3-demo/"
    ng build --prod --configuration=dev-02 --outputPath=dist/dev02
    ng build --prod --configuration=dev-01 --outputPath=dist/dev01
    ng build --prod --configuration=development --outputPath=dist/development
    ng build --prod --configuration=demo --outputPath=dist/demo
    ng build --prod --configuration=production --outputPath=dist/production
    ng build --prod --configuration=development --aot --build-optimizer --outputPath=dist/HR-Desk-2021-12-22-development_aot
    ng build --prod --configuration=production --aot --build-optimizer --outputPath=dist/HR-Desk-2021-12-22-production_aot
    ng build --prod --configuration=development --outputPath=/c/inetpub/wwwroot/staff-portal
```
