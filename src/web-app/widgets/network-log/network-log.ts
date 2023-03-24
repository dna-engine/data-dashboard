// DataDashboard ~~ MIT License
// Widget controller

import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';
import { DataTable } from 'simple-datatables';
class DT extends DataTable {}
declare namespace simpleDatatables { class DataTable extends DT {} }  //eslint-disable-line

const appWidgetNetworkLog = {
   show(widgetElem: JQuery): void {
      const tableElem = widgetElem.find('figure table');
      const options =   { perPageSelect: [10, 25, 50, 100] };
      const dataTable = new simpleDatatables.DataTable(<HTMLTableElement>tableElem[0], options);
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
