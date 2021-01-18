// DataDashboard
// Widget controller

app.widget.networkLog = {
   show(widgetElem) {
      const tableElem = widgetElem.find('figure table');
      const dataTable = new window.simpleDatatables.DataTable(tableElem[0], { perPageSelect: [10, 25, 50, 100] });
      const headers =   fetchJson.getLogHeaders();
      const log =       app.network.getLog().reverse();
      const delColumn = fetchJson.getLogHeaderIndex().domain;
      headers.splice(delColumn, 1);
      app.transformer.dataTablesNormalizer(log, headers.length, delColumn);
      dataTable.insert({ headings: headers, data: log });
      widgetElem.data().table = dataTable;
      },
   };
