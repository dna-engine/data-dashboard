// DataDashboard
// Chart Utilities

dataDashboard.util = {
   addChartColors: (datasets) => {
      const colorize = (dataset, i) => {
         dataset.fill =            false;
         dataset.borderColor =     dataDashboard.chartColors[i];
         dataset.backgroundColor = dataDashboard.chartColors[i];
         };
      datasets.forEach(colorize);
      return datasets;
      },
   spinnerStart: (widgetElem) => {
      const create = () =>
         library.ui.makeIcons($('<widget-spinner><i data-icon=yin-yang class=fa-spin>'))
            .appendTo(widgetElem);
      const current = widgetElem.addClass('waiting').find('>widget-spinner');
      const spinnerElem = current.length ? current : create();
      return spinnerElem.hide().fadeIn().parent();
      },
   spinnerStop: (widgetElem) => {
      return widgetElem.removeClass('waiting').find('>widget-spinner').fadeOut().parent();
      }
   };

dataDashboard.network = {
   logName: 'network-log',
   logEvent: (...event) => {
      console.log(event);
      const maxLogEvents = 250;
      const log = dataDashboard.network.getLog();
      log.push(event);
      while (log.length > maxLogEvents)
         log.shift();
      localStorage.setItem(dataDashboard.network.logName, JSON.stringify(log));
      },
   getLog: () => {
      return JSON.parse(localStorage.getItem(dataDashboard.network.logName) || '[]');
      }
   };

dataDashboard.transformer = {
   dataTablesNormalizer: (rows, numColumns, indexRemoveColumn) => {
      const normalize = (row) => {
         const toStr = (value, i) => {
            if (typeof value !== 'string')
               row[i] = ['boolean', 'number'].includes(typeof value) ? '' + value : '';
            };
         row.forEach(toStr);
         if (indexRemoveColumn !== undefined)
            row.splice(indexRemoveColumn, 1);
         while (row.length < numColumns)
            row.push('');
         while (row.length > numColumns)
            row.pop();
         };
      rows.forEach(normalize);
      return rows;
      }
   };
