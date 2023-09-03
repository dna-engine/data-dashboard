# DataDashboard
<img src=https://dna-engine.org/graphics/dna-logo.png align=right width=160 alt=logo>

_A data-driven dashboard console for report widgets_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/dna-engine/data-dashboard/blob/main/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/data-dashboard.svg)](https://www.npmjs.com/package/data-dashboard)
[![Build](https://github.com/dna-engine/data-dashboard/workflows/build/badge.svg)](https://github.com/dna-engine/data-dashboard/actions/workflows/run-spec-on-push.yaml)

## A) Try It Out
https://data-dashboard.js.org

## B) Reference Architecture
**DataDashboard** provides examples of creating charts and tables from REST calls, and it aims to
be a reference architecture for building data-driven dashboard consoles composed of report widgets.

The list of report widgets and dashboard panels is defined in
[`src/modules/config.js`](https://github.com/dna-engine/data-dashboard/blob/main/src/web-app/+context/modules/config.ts),
and the routing is handled in
[`src/modules/controller.js`](https://github.com/dna-engine/data-dashboard/blob/main/src/web-app/+context/modules/controller.ts).
Each widget has a folder under
[`src/widgets`](https://github.com/dna-engine/data-dashboard/tree/main/src/widgets)
that contains the widget's view and controller.

## C) Run Locally
Install:
* **git** from https://git-scm.com
* **Node.js** from https://nodejs.org

Then enter the terminal commands:
```
$ git clone https://github.com/dna-engine/data-dashboard
$ cd data-dashboard
$ npm install
$ npm start
```
Alternatively, fork this project and then clone your forked version.

## D) Development Mode
Run the application in development mode with the command:
```
$ npm run dev
```
The web server will use the un-minified version of the application, and file watchers will
automatically rebuild the appropriate parts of the application when source files change.

## E) Libraries
Powered by:
* [Chart.js](https://www.chartjs.org)
* [dna-engine](https://dna-engine.org)
* [fetch-json](https://www.npmjs.com/package/fetch-json)
* [rev-web-assets](https://www.npmjs.com/package/rev-web-assets)
* [Simple-DataTables](https://github.com/fiduswriter/Simple-DataTables)

---
[MIT License](LICENSE.txt)
