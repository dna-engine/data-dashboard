// DataDashboard
// Utilities

import { ChartConfiguration, ChartDataset } from 'chart.js';
import { libX } from 'web-ignition';
import { app, AppCallback, AppChartColor, AppOptionsNarrowScreenSaver, AppParams, AppParamValue } from './app.js';

const appUtil = {
   lookupChartColor(i: number): string {
      return (<AppChartColor>app.cfg.chartColors[i % app.cfg.chartColors.length]).value;
      },
   addChartColors(datasets: ChartDataset[], startIndex = 0): ChartDataset[] {
      const colorize = (dataset: ChartDataset, i: number) => {
         dataset['fill'] =         false;   //TODO: property does not exist?
         dataset.borderColor =     app.util.lookupChartColor(startIndex + i);
         dataset.backgroundColor = app.util.lookupChartColor(startIndex + i);
         };
      datasets.forEach(colorize);
      return datasets;
      },
   narrowScreenSaver(chartInfo: ChartConfiguration, options?: AppOptionsNarrowScreenSaver): ChartConfiguration {
      const defaults = { maxPoints: 200, screenWidth: 700 };
      const settings = { ...defaults, ...options };
      const shrinkRatio = Math.ceil(chartInfo.data.labels.length / settings.maxPoints);
      const shrinkNow = () => {
         const shrink = (points: unknown[]) => points.filter((_point, i) => i % shrinkRatio === 0);
         chartInfo.data.labels = shrink(chartInfo.data.labels);
         chartInfo.data.datasets.forEach((dataset: ChartDataset) => dataset.data = shrink(dataset.data));
         };
      if (shrinkRatio > 1 && <number>$(document.body).width() < settings.screenWidth)
         shrinkNow();
      return chartInfo;
      },
   secsToStr(epocSeconds: number): string {  //example: "2019-01-02 05:34:15"
      return new Date(epocSeconds * 1000).toISOString().replace('T', ' ').substring(0, 19);
      },
   spinnerStart(widgetElem: JQuery): JQuery {
      // DOM:
      //    <app-widget>
      //       <header><h2>Title</h2></header>
      //       <app-widget-body>...</app-widget-body>
      //       <app-widget-spinner><i data-icon=yin-yang></i></app-widget-spinner>
      //    </app-widget>
      widgetElem = widgetElem.closest('app-widget');
      const spinnerHtml = '<app-widget-spinner><i data-icon=yin-yang class=fa-spin>';
      const makeElem = () => $(spinnerHtml).css({ paddingTop: <number>widgetElem.height() / 2 - 50 });
      const create = () => libX.ui.makeIcons(makeElem()).appendTo(widgetElem);
      const current = widgetElem.addClass('waiting').find('>app-widget-spinner');
      const spinnerElem = current.length ? current : create();
      return spinnerElem.hide().fadeIn().parent();
      },
   spinnerStop(widgetElem: JQuery): JQuery {
      const elem = widgetElem.closest('app-widget').removeClass('waiting');
      elem.find('>app-widget-spinner').fadeOut(1500);
      return elem;
      },
   fetchJsonp(url: string, params?: AppParams, jsonpName?: string, callback?: AppCallback): JQueryXHR {
      const urlObj = new URL(url);
      const addParam = (param: [string, AppParamValue]) =>
         urlObj.searchParams.append(param[0], String(param[1]));
      if (params)
         Object.entries(params).forEach(addParam);
      const options = { url: urlObj.href, dataType: 'jsonp', jsonpCallback: jsonpName };
      return $.ajax(options).done(<AppCallback>callback);
      },
   };

const appNetwork = {
   logName: 'network-log',
   logEvent(...eventItems: (string | number | boolean)[]): void {
      console.log(eventItems.join(' - '));
      const maxLogEvents = 250;
      const log = app.network.getLog();
      log.push(eventItems);
      while (log.length > maxLogEvents)
         log.shift();
      localStorage.setItem(app.network.logName, JSON.stringify(log));
      },
   getLog(): (string | number | boolean)[][] {
      return JSON.parse(<string>localStorage.getItem(app.network.logName)) || [];
      },
   };

const appTransformer = {
   dataTablesNormalizer(rows: unknown[][], numColumns?: number, indexRemoveColumn?: number): string[][] {
      // Ensures the table rows are all equal length arrays of strings.
      const size = numColumns ? numColumns : rows.length ? (<unknown[]>rows[0]).length : 0;
      const normalize = (row: unknown[]) => {
         const toStr = (value: unknown, i: number) => {
            const type = typeof value;
            if (type !== 'string')
               row[i] = ['boolean', 'number'].includes(type) ? String(value) : '';
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
      return <string[][]>rows;
      },
   };

export { appUtil, appNetwork, appTransformer };
