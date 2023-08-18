// DataDashboard ~~ MIT License
// Widget controller

import { Chart, ChartConfiguration, ChartDataset } from 'chart.js';
import { fetchJson } from 'fetch-json';

import { appUtil } from '../../modules/util';
import { appLookup } from '../../modules/lookup';
import { AppChartColor } from '../../modules/config';

// {
//    'Meta Data': {
//       '1: Symbol': 'USDEUR',
//       '2: Indicator': 'Simple Moving Average (SMA)',
//       '3: Last Refreshed': '2018-12-21'
//    },
//    'Technical Analysis: SMA': {
//       '2018-12-21': {
//          'SMA': '0.8773'
//       },
//       '2018-12-14': {
//          'SMA': '0.8757'
//       },
//       ...

type RawDataSma = { SMA: string };
type RawData = {
   'Meta Data': {
      '1: Symbol':         string,
      '2: Indicator':      string,
      '3: Last Refreshed': string,
      },
   'Technical Analysis: SMA': { [date: string]: RawDataSma },
   };

const appWidgetFinRateMovingAvg = {
   displayDataChart(widgetElem: Element, rawData: RawData): void {
      const transform = (rawData: RawData) => {
         const metadata =   rawData['Meta Data'];
         const timeSeries = rawData['Technical Analysis: SMA'];
         const timestamps = Object.keys(timeSeries).sort();
         return {
            title:    metadata['2: Indicator'],
            subtitle: metadata['3: Last Refreshed'],
            set:      metadata['1: Symbol'],
            labels:   timestamps,
            values:   timestamps.map(timestamp => parseFloat((<RawDataSma>timeSeries[timestamp]).SMA)),
            };
         };
      const data = transform(rawData);
      const dataset: ChartDataset = {
         label:           data.set,
         data:            data.values,
         borderColor:     (<AppChartColor>appLookup.chartColor.purple).value,
         backgroundColor: (<AppChartColor>appLookup.chartColor.purple).value,
         };
      const chartInfo = <ChartConfiguration>{
         type: 'line',
         data: {
            labels:   data.labels,
            datasets: [dataset],
            },
         options: {
            maintainAspectRatio: false,
            plugins: {
               title: { display: true, text: [data.title, data.subtitle] },
               },
            },
         };
      const canvas = widgetElem.querySelector('canvas')!;
      dna.dom.state(widgetElem).chart = new Chart(canvas, chartInfo);
      },
   show(widgetElem: Element): void {
      const handleData = (rawData: RawData) => {
         appUtil.spinnerStop(widgetElem);
         if (!rawData[<keyof RawData>'Error Message'])
            appWidgetFinRateMovingAvg.displayDataChart(widgetElem, rawData);
         };
      const url = 'https://www.alphavantage.co/query';
      const params = {
         function:    'SMA',
         symbol:      'USDEUR',
         interval:    'weekly',
         time_period: 10,
         series_type: 'open',
         apikey:      'demo' ,
         };
      appUtil.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetFinRateMovingAvg };
