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
   logEvent: (...event) => {
      const maxLogEvents = 50;
      const eventUrlIndex = 3;
      const log = dataDashboard.network.getLog();
      event[eventUrlIndex] = new URL(event[eventUrlIndex]).hostname;
      log.push(event);
      while (log.length > maxLogEvents)
         log.shift();
      localStorage.setItem('network-log', JSON.stringify(log));
      },
   getLog: () => {
      return JSON.parse(localStorage.getItem('network-log') || '[]');
      }
   };
