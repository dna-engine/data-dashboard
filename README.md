# DataDashboard
<img src=https://dnajs.org/graphics/dnajs-logo.png align=right width=160 alt=logo>

_A data-driven dashboard console for report widgets_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/dnajs/data-dashboard/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/data-dashboard.svg)](https://www.npmjs.com/package/data-dashboard)
[![Vulnerabilities](https://snyk.io/test/github/dnajs/data-dashboard/badge.svg)](https://snyk.io/test/github/dnajs/data-dashboard)
[![Build](https://github.com/dnajs/data-dashboard/workflows/build/badge.svg)](https://github.com/dnajs/data-dashboard/actions?query=workflow%3Abuild)

## Try It Out
https://data-dashboard.js.org

## Reference Architecture
**DataDashboard** provides examples of creating charts and tables from REST calls, and it aims to
be a reference architecture for building data-driven dashboard consoles composed of report widgets.

The list of report widgets and dashboard panels is defined in
[`src/ts/config.js`](https://github.com/dnajs/data-dashboard/blob/main/src/web/ts/config.ts),
and the routing is handled in
[`src/ts/controller.js`](https://github.com/dnajs/data-dashboard/blob/main/src/web/ts/controller.ts).
Each widget has a folder under
[`src/widgets`](https://github.com/dnajs/data-dashboard/tree/main/src/widgets)
that contains the widget's view and controller.

## Run Locally
Install:
* **git** from https://git-scm.com
* **Node.js** from https://nodejs.org

Then enter the terminal commands:
```
$ git clone https://github.com/dnajs/data-dashboard
$ cd data-dashboard
$ npm install
$ npm start
```

## Development Mode
Run the application in development mode with the command:
```
$ npm run dev
```
The web server will use the un-minified version of the application, and file watchers will
automatically rebuild the appropriate parts of the application when source files change.

## Libraries
Powered by:
* [Chart.js](https://www.chartjs.org)
* [dna.js](https://dnajs.org)
* [fetch-json](https://www.npmjs.com/package/fetch-json)
* [gulp-rev-all](https://github.com/smysnk/gulp-rev-all)
* [Simple-DataTables](https://github.com/fiduswriter/Simple-DataTables)

---
[MIT License](LICENSE.txt)
