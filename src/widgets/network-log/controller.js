// DataDashboard
// Widget controller

dataDashboard.widget.networkLog = {
   show: (widgetElem) => {
      const log = dataDashboard.network.getLog().reverse();
      console.log(log);
      const table = widgetElem.find('figure table');
      const headers = ['Timestamp', 'HTTP', 'Method', 'Domain', 'Ok', 'Status', 'Text', 'Content'];
      table.append($('<tr><th>' + headers.join('</th><th>') + '</th></tr>'));
      const displayEvent = (event) =>
         table.append($('<tr><td>' + event.join('</td><td>') + '</td></tr>'));
      log.forEach(displayEvent);
      // const headings = ['AAA', 'BBB', 'CCC', 'DDD'];
      // const data = [[1,2,3], [4,5,6], [7,8,9], [0,0,0]];
      // const dataTable = new window.DataTable(widgetElem.find('figure table')[0]);
      // dataTable.insert({ headings: headings, data: data });
      // widgetElem.data().table = dataTable;
      }
   };
