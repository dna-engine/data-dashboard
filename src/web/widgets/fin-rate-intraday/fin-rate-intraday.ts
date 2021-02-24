// DataDashboard
// Widget controller

import { Chart, ChartConfiguration, ChartDataset, ChartItem } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';

// {
//    'Meta Data': {
//       '1. Information':    'FX Intraday (5min) Time Series',
//       '2. From Symbol':    'EUR',
//       '3. To Symbol':      'USD',
//       '4. Last Refreshed': '2018-12-21 22:00:00'
//       },
//    'Time Series FX (5min)': {
//       '2018-12-21 22:00:00': {
//          '1. open':  '1.1372',
//          '2. high':  '1.1372',
//          '3. low':   '1.1365',
//          '4. close': '1.1367'
//          },
//       '2018-12-21 21:55:00': {
//          '1. open':  '1.1365',
//          '2. high':  '1.1375',
//          '3. low':   '1.1364',
//          '4. close': '1.1368'
//          },
//       ...

type RawDataTimeSeriesPoint = {
   '1. open':  string,
   '2. high':  string,
   '3. low':   string,
   '4. close': string,
   };
type RawData = {
   'Error Message': string,
   'Meta Data': {
      '1. Information':    string,
      '2. From Symbol':    string,
      '3. To Symbol':      string,
      '4. Last Refreshed': string,
      },
   'Time Series FX (5min)': { [date: string]: RawDataTimeSeriesPoint },
   };
type DisplayData = {
   title:    string,
   subtitle: string,
   labels:   string[],
   lows:     number[],
   highs:    number[],
   };

const appWidgetFinRateIntraday = {
   displayDataChart(widgetElem: JQuery, rawData: RawData): void {
      const transform = (rawData: RawData): DisplayData => {
         const metadata =   rawData['Meta Data'];
         const timeSeries = rawData['Time Series FX (5min)'];
         const timestamps = Object.keys(timeSeries).sort();
         const symbols =    metadata['2. From Symbol'] + '/' + metadata['3. To Symbol'];
         return {
            title:    metadata['1. Information'],
            subtitle: symbols + ' ' + metadata['4. Last Refreshed'],
            labels:   timestamps.map(timestamp => timestamp.substring(11, 16)),
            lows:     timestamps.map(timestamp => parseFloat(timeSeries[timestamp]!['3. low'])),
            highs:    timestamps.map(timestamp => parseFloat(timeSeries[timestamp]!['2. high']))
            };
         };
      const data = transform(rawData);
      const datasets: ChartDataset[] = [
         { label: 'Low',  data: data.lows },
         { label: 'High', data: data.highs },
         ];
      const chartInfo = <ChartConfiguration>{
         type: 'line',
         data: {
            labels:   data.labels,
            datasets: app.util.addChartColors(datasets),
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [data.title, data.subtitle] },
            },
         };
      const canvas: ChartItem = widgetElem.find('canvas');
      widgetElem.data().chart = new Chart(canvas, chartInfo);
      },
   show(widgetElem: JQuery): void {
      const handleData = (rawData: RawData) => {
         app.util.spinnerStop(widgetElem);
         if (!rawData || rawData['Error Message'])
            console.error(url, rawData);
         else
            app.widget.finRateIntraday.displayDataChart(widgetElem, rawData);
         };
      const url = 'https://www.alphavantage.co/query';
      const params = {
         function:    'FX_INTRADAY',
         from_symbol: 'EUR',
         to_symbol:   'USD',
         interval:    '5min',
         outputsize:  'full',
         apikey:      'demo',
         };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetFinRateIntraday };
