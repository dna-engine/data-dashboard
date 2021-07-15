// DataDashboard
// Widget controller

import { Chart, ChartConfiguration, ChartDataset, ChartItem, ChartTypeRegistry, TooltipItem } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';

// {
//    root: {
//       stations: {
//          station: [
//             {
//                name:           '12th St. Oakland City Center',
//                abbr:           '12TH',
//                gtfs_latitude:  '37.803768',
//                gtfs_longitude: '-122.271450',
//                address:        '1245 Broadway',
//                city:           'Oakland',
//                county:         'alameda',
//                state:          'CA',
//                zipcode:        '94612'
//             },
//             ...

type Station = {
   name:           string,
   abbr:           string,
   gtfs_latitude:  string,
   gtfs_longitude: string,
   city:           string,
   county:         string,
   };
type RawData = {
   root: { stations: { station: Station[] } },
   };
type DataPoint = {
   x:     number,
   y:     number,
   label: string,
   };

const appWidgetTransBartStations = {
   displayDataChart(widgetElem: JQuery, stations: Station[]): void {
      const dataset: ChartDataset = {
         label: 'Geolocation',
         backgroundColor: app.lookup.chartColor.green!.value,
         data: stations.map((item: Station): DataPoint => ({
            x:     parseFloat(item.gtfs_longitude),
            y:     parseFloat(item.gtfs_latitude),
            label: item.abbr + ' (' + item.name + ')',
            })),
         };
      const latLong = (item: TooltipItem<keyof ChartTypeRegistry>): string => {
         // Returns a string formatted like: "37.2°N 27.9°W"
         const lat =  parseFloat(item.formattedValue);
         const long = parseFloat(item.label);
         return `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'} ${Math.abs(long)}°${long > 0 ? 'E' : 'W'}`;
         };
      const makeTooltip = (item: TooltipItem<keyof ChartTypeRegistry>): string =>
         (<DataPoint>item.dataset.data[item.dataIndex]).label + ' ' + latLong(item);
      const chartInfo = <ChartConfiguration><unknown>{
         type: 'scatter',
         data: {
            datasets: [dataset],
            },
         options: {
            maintainAspectRatio: false,
            plugins: {
               title:   { display: true, text: ['BART Stations', 'San Francisco Bay Area'] },
               tooltip: { callbacks: { label: makeTooltip } },
               },
            },
         };
      const canvas: ChartItem = widgetElem.find('canvas');
      widgetElem.data().chart = new Chart(canvas, chartInfo);
      },
   displayDataTable(widgetElem: JQuery, stations: Station[]): void {
      const tableElem = widgetElem.find('figure table');
      const DataTable = globalThis['simpleDatatables'].DataTable;
      const dataTable = new DataTable(tableElem[0]);
      const headers = [
         'Name',
         'Code',
         'Latitude',
         'Longitude',
         'City',
         'County',
         ];
      const rows = stations.map(station => [
         station.name,
         station.abbr,
         station.gtfs_latitude,
         station.gtfs_longitude,
         station.city,
         station.county,
         ]);
      dataTable.insert({ headings: headers, data: rows });
      widgetElem.data().table = dataTable;
      },
   show(widgetElem: JQuery): void {
      const handleData = (data: RawData) => {
         app.util.spinnerStop(widgetElem);
         const stations = data.root.stations.station;
         app.widget.transBartStations.displayDataChart(widgetElem, stations);
         app.widget.transBartStations.displayDataTable(widgetElem, stations);
         };
      const url = 'https://api.bart.gov/api/stn.aspx';
      const params = { cmd: 'stns', key: 'MW9S-E7SL-26DU-VV8V', json: 'y' };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetTransBartStations };
