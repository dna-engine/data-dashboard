// DataDashboard ~~ MIT License
// Widget controller

import { Chart, ChartConfiguration, ChartDataset, ChartItem, ChartTypeRegistry, Point, TooltipItem } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';
import { DataTable } from 'simple-datatables';
class DT extends DataTable {}
declare namespace simpleDatatables { class DataTable extends DT {} }  //eslint-disable-line

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
type Point$ = Point & { label: string };  //patch library type

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
         // Returns a string formatted like: "37.77°N 122.42°W" (San Francisco)
         const lat =   item.parsed.y;
         const long =  item.parsed.x;
         const fixed = (degrees: number) => Math.abs(degrees).toFixed(2);
         return `${fixed(lat)}°${lat > 0 ? 'N' : 'S'} ${fixed(long)}°${long > 0 ? 'E' : 'W'}`;
         };
      const makeTooltip = (item: TooltipItem<keyof ChartTypeRegistry>): string =>
         `${(<Point$>item.dataset.data[item.dataIndex]).label} ${latLong(item)}`;
      const chartInfo: ChartConfiguration = {
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
      const dataTable = new simpleDatatables.DataTable(<HTMLTableElement>tableElem[0]);
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
