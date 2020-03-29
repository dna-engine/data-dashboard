// DataDashboard
// Utilities

app.util = {
   chartColors: Object.keys(app.chartColor).map(color => app.chartColor[color]),
   getChartColor(i) {
      return app.util.chartColors[i % app.util.chartColors.length];
      },
   addChartColors(datasets, startIndex) {
      const increment = startIndex ? startIndex : 0;
      const colorize = (dataset, i) => {
         dataset.fill =            false;
         dataset.borderColor =     app.util.getChartColor(i + increment);
         dataset.backgroundColor = app.util.getChartColor(i + increment);
         };
      datasets.forEach(colorize);
      return datasets;
      },
   narrowScreenSaver(chartInfo, options) {
      const defaults = { maxPoints: 200, screenWidth: 700 };
      const settings = Object.assign(defaults, options);
      const shrinkRatio = Math.ceil(chartInfo.data.labels.length / settings.maxPoints);
      const shrinkNow = () => {
         const shrink = (points) => points.filter((point, i) => i % shrinkRatio === 0);
         chartInfo.data.labels = shrink(chartInfo.data.labels);
         chartInfo.data.datasets.forEach(dataset => dataset.data = shrink(dataset.data));
         };
      if (shrinkRatio > 1 && $(window.document).width() < settings.screenWidth)
         shrinkNow();
      return chartInfo;
      },
   secsToStr(epocSeconds) {  //example: "2019-01-02 05:34:15"
      return new Date(epocSeconds * 1000).toISOString().replace('T', ' ').substring(0, 19);
      },
   spinnerStart(widgetElem) {
      // DOM:
      //    <app-widget>
      //       <header><h2>Title</h2></header>
      //       <widget-body>...</widget-body>
      //       <widget-spinner><i data-icon=yin-yang></i></widget-spinner>
      //    </app-widget>
      widgetElem = widgetElem.closest('app-widget');
      const spinnerHtml = '<widget-spinner><i data-icon=yin-yang class=fa-spin>';
      const makeElem = () => $(spinnerHtml).css({ paddingTop: widgetElem.height() / 2 - 50 });
      const create = () => library.ui.makeIcons(makeElem()).appendTo(widgetElem);
      const current = widgetElem.addClass('waiting').find('>widget-spinner');
      const spinnerElem = current.length ? current : create();
      return spinnerElem.hide().fadeIn().parent();
      },
   spinnerStop(widgetElem) {
      return widgetElem.closest('app-widget').removeClass('waiting').find('>widget-spinner').fadeOut(1500).parent();
      },
   fetchJsonp(url, params, jsonpName, callback) {
      const logDomain = url.replace(/.*:\/\//, '').replace(/[:\/].*/, '');  //extract hostname
      app.network.logEvent(new Date().toISOString(), 'request', 'GET', logDomain, url);
      const toPair = (key) => key + '=' + encodeURIComponent(params[key]);
      if (params)
         url = url + '?' + Object.keys(params).map(toPair).join('&');
      return $.ajax({ url: url, dataType: 'jsonp', jsonpCallback: jsonpName }).done(callback);
      }
   };

app.network = {
   logName: 'network-log',
   logEvent(...event) {
      console.log(event.join(' - '));
      const maxLogEvents = 250;
      const log = app.network.getLog();
      log.push(event);
      while (log.length > maxLogEvents)
         log.shift();
      localStorage.setItem(app.network.logName, JSON.stringify(log));
      },
   getLog() {
      return JSON.parse(localStorage.getItem(app.network.logName) || '[]');
      }
   };

app.transformer = {
   dataTablesNormalizer(rows, numColumns, indexRemoveColumn) {
      const size = numColumns ? numColumns : rows.length ? rows[0].length : 0;
      const normalize = (row) => {
         const toStr = (value, i) => {
            if (typeof value !== 'string')
               row[i] = ['boolean', 'number'].includes(typeof value) ? '' + value : '';
            };
         row.forEach(toStr);
         if (indexRemoveColumn !== undefined)
            row.splice(indexRemoveColumn, 1);
         while (row.length < size)
            row.push('');
         while (row.length > size)
            row.pop();
         };
      rows.forEach(normalize);
      return rows;
      }
   };
