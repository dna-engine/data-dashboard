// DataDashboard
// Widget controller

import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app.js';

const appWidgetNetworkLog = {
   show(widgetElem: JQuery) {
      const tableElem = widgetElem.find('figure table');
      const DataTable = globalThis['simpleDatatables'].DataTable;
      const dataTable = new DataTable(tableElem[0], { perPageSelect: [10, 25, 50, 100] });
      const headers =   fetchJson.getLogHeaders();
      const log =       app.network.getLog().reverse();
      const delColumn = <number>fetchJson.getLogHeaderIndex().domain;
      headers.splice(delColumn, 1);
      app.transformer.dataTablesNormalizer(log, headers.length, delColumn);
      dataTable.insert({ headings: headers, data: log });
      widgetElem.data().table = dataTable;
      },
   };

export { appWidgetNetworkLog };
