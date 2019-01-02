# DataDashboard
<img src=https://dnajs.org/graphics/dnajs-logo.png align=right width=160 alt=logo>

_A data-driven dashboard console for report widgets_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/dnajs/data-dashboard/blob/master/LICENSE.txt)
[![Dependencies](https://david-dm.org/dnajs/data-dashboard/status.svg)](https://david-dm.org/dnajs/data-dashboard)
[![Vulnerabilities](https://snyk.io/test/github/dnajs/data-dashboard/badge.svg)](https://snyk.io/test/github/dnajs/data-dashboard)
[![Build](https://travis-ci.org/dnajs/data-dashboard.svg)](https://travis-ci.org/dnajs/data-dashboard)

## Try it out
https://data-dashboard.js.org

## Reference architecture
**DataDashboard** show examples of creating charts and tables from REST calls, and it aims to be a
reference architecture for building data-driven dashboard consoles composed of report widgets.

The list of report widgets and dashboard panels is defined in
[`src/scripts/config.js`](https://github.com/dnajs/data-dashboard/blob/master/src/scripts/config.js),
and the routing is handled in
[`src/scripts/controller.js`](https://github.com/dnajs/data-dashboard/blob/master/src/scripts/controller.js).
Each widget has a folder under
[`src/widgets`](https://github.com/dnajs/data-dashboard/tree/master/src/widgets)
that contains the widget's view and controller.

## Libraries
Powered by:
* [Chart.js](https://www.chartjs.org)
* [vanilla-datatables](https://github.com/Mobius1/Vanilla-DataTables)
* [fetch-json](https://www.npmjs.com/package/fetch-json)
* [dna.js](https://dnajs.org)

---
[MIT License](LICENSE.txt)
