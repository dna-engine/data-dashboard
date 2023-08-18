// DataDashboard ~~ MIT License
// Utilities

// Imports
import { ChartConfiguration, ChartDataset } from 'chart.js';
import { libX } from 'web-ignition';

// Modules
import { AppChartColor } from './config';
import { appLookup } from './lookup';

// Types
export type AppSettingsNarrowScreenSaver = {
   maxPoints:   number,
   screenWidth: number,
   };
export type AppOptionsNarrowScreenSaver = Partial<AppSettingsNarrowScreenSaver>;

const appUtil = {
   lookupChartColor(i: number): string {
      return (<AppChartColor>appLookup.chartColors[i % appLookup.chartColors.length]).value;
      },
   addChartColors(datasets: ChartDataset[], startIndex = 0): ChartDataset[] {
      type ChartDataset$ = ChartDataset & { fill: boolean };  //patch library type
      const colorize = (dataset: ChartDataset, i: number) => {
         (<ChartDataset$>dataset).fill = false;
         dataset.borderColor =           appUtil.lookupChartColor(startIndex + i);
         dataset.backgroundColor =       appUtil.lookupChartColor(startIndex + i);
         };
      datasets.forEach(colorize);
      return datasets;
      },
   narrowScreenSaver(chartInfo: ChartConfiguration, options?: AppOptionsNarrowScreenSaver): ChartConfiguration {
      const defaults = { maxPoints: 200, screenWidth: 700 };
      const settings = { ...defaults, ...options };
      const shrinkRatio = Math.ceil(chartInfo.data.labels!.length / settings.maxPoints);
      const shrinkNow = () => {
         const shrink = (points: number[]) => points.filter((_point, i) => i % shrinkRatio === 0);
         chartInfo.data.labels = shrink(<number[]>chartInfo.data.labels);
         chartInfo.data.datasets.forEach((dataset: ChartDataset) => dataset.data = shrink(<number[]>dataset.data));
         };
      if (shrinkRatio > 1 && globalThis.window.innerWidth < settings.screenWidth)
         shrinkNow();
      return chartInfo;
      },
   secsToStr(epocSeconds: number): string {  //example: "2019-01-02 05:34:15"
      return new Date(epocSeconds * 1000).toISOString().replace('T', '+').substring(0, 19);
      },
   spinnerStart(widgetElem: Element): Element {
      // <app-widget>
      //    <header><h2>Title</h2></header>
      //    <app-widget-body>...</app-widget-body>
      //    <app-widget-spinner><i data-icon=yin-yang></i></app-widget-spinner>
      // </app-widget>
      const elem = widgetElem.closest('app-widget')!;
      const create = () => {
         const options = { html: '<i data-icon=yin-yang class=fa-spin>' };
         const spinner = dna.dom.create(<keyof HTMLElementTagNameMap>'app-widget-spinner', options);
         spinner.style.paddingTop = String(elem.clientHeight / 2 - 50) + 'px';
         elem.appendChild(libX.ui.makeIcons(spinner));
         return spinner;
         };
      const spinnerElem = elem.querySelector('app-widget-spinner') || create();
      elem.classList.add('waiting');
      dna.ui.fadeIn(dna.ui.hide(spinnerElem));
      return widgetElem;
      },
   spinnerStop(widgetElem: Element): Element {
      const elem =    widgetElem.closest('app-widget')!;
      const spinner = elem.querySelector('app-widget-spinner')!;
      elem.classList.remove('waiting');
      // dna.ui.fadeOut(spinner, { duration: 1500 }).then(dna.ui.hide);
      dna.ui.fadeOut(spinner).then(dna.ui.hide);
      return elem;
      },
   };

const appNetwork = {
   logName: 'network-log',
   logEvent(...eventItems: (string | number | boolean)[]): void {
      console.log(eventItems.join(' - '));
      const maxLogEvents = 250;
      const log = appNetwork.getLog();
      log.push(eventItems);
      while (log.length > maxLogEvents)
         log.shift();
      localStorage.setItem(appNetwork.logName, JSON.stringify(log));
      },
   getLog(): (string | number | boolean)[][] {
      return JSON.parse(<string>localStorage.getItem(appNetwork.logName)) || [];
      },
   };

const appTransformer = {
   dataTablesNormalizer(rows: unknown[][], numColumns?: number, indexRemoveColumn?: number): string[][] {
      // Ensures the table rows are all equal length arrays of strings.
      const size = numColumns ? numColumns : rows.length ? (<unknown[]>rows[0]).length : 0;
      const normalize = (row: unknown[]) => {
         const toStr = (value: unknown, i: number) =>
            row[i] = ['boolean', 'number'].includes(typeof value) ? String(value) : '';
         row.forEach((value: unknown, i: number) => typeof value !== 'string' && toStr(value, i));
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
