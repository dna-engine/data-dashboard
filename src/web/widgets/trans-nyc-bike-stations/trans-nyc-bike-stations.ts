// DataDashboard
// Widget controller

import { Chart, ChartConfiguration, ChartItem } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';

// {
//    last_updated: 1546391115,
//    ttl: 10,
//    data: {
//       stations: [
//          {
//             station_id: "72",
//             num_bikes_available: 0,
//             num_ebikes_available: 0,
//             num_bikes_disabled: 2,
//             num_docks_available: 37,
//             num_docks_disabled: 0,
//             is_installed: 1,
//             is_renting: 1,
//             is_returning: 1,
//             last_reported: 1546388786,
//             eightd_has_available_keys: false
//          },
//          ...

type Station = {
   capacity:            number,
   num_docks_available: number,
   num_bikes_available: number,
   num_bikes_disabled:  number,
   availableDocks:      number,
   totalDocks:          number,
   availableBikes:      number,
   reservedBikes:       number,
   };
type RawData = {
   last_updated: number,
   data:         { stations: Station[] },
   };

const appWidgetTransNycBikeStations = {
   displayDataChart(widgetElem: JQuery, data: RawData): void {
      const title =    'NYC Bike Stations';
      const subtitle = 'Capacity on ' + new Date(data.last_updated * 1000).toLocaleString();
      const stations = data.data.stations;
      stations.forEach(station => station.capacity =
         station.num_docks_available + station.num_bikes_available + station.num_bikes_disabled);
      stations.sort((a, b) => a.capacity - b.capacity);
      stations.forEach(station => station.reservedBikes =
         station.totalDocks - station.availableDocks - station.availableBikes);
      const datasets = [
         { label: 'Available docks', data: stations.map(station => station.num_docks_available) },
         { label: 'Available bikes', data: stations.map(station => station.num_bikes_available) },
         { label: 'Disabled bikes',  data: stations.map(station => station.num_bikes_disabled) },
         ];
      const chartInfo = <ChartConfiguration>{
         type: 'bar',
         data: {
            labels:   Array.from({ length: stations.length }, (value, i) => i + 1),
            datasets: app.util.addChartColors(datasets, 3)
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [title, subtitle] },
            scales: { x: { stacked: true }, y: { stacked: true } },
            },
         };
      app.util.narrowScreenSaver(chartInfo);
      const canvas = <ChartItem>widgetElem.find('canvas');
      widgetElem.data().chart = new Chart(canvas, chartInfo);
      },
   show(widgetElem: JQuery): void {
      const url = 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json';
      const handleData = (data: RawData) => {
         app.util.spinnerStop(widgetElem);
         app.widget.transNycBikeStations.displayDataChart(widgetElem, data);
         };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url).then(handleData);
      },
   };

export { appWidgetTransNycBikeStations };
