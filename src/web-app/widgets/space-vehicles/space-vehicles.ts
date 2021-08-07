// DataDashboard ~~ MIT License
// Widget controller

import { Chart, ChartConfiguration, ChartItem } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';

// {
//    count: 39,
//    next: 'https://swapi.dev/api/vehicles/?page=2&format=json',
//    previous: null,
//    results: [
//       {
//          name: 'Sand Crawler',
//          model: 'Digger Crawler',
//          manufacturer: 'Corellia Mining Corporation',
//          cost_in_credits: '150000',
//          length: '36.8',
//          max_atmosphering_speed: '30',
//          crew: '46',
//          passengers: '30',
//          cargo_capacity: '50000',
//          consumables: '2 months',
//          vehicle_class: 'wheeled',
//          pilots: [],
//          films: [
//             'https://swapi.dev/api/films/5/',
//             'https://swapi.dev/api/films/1/'
//          ],
//          created: '2014-12-10T15:36:25.724000Z',
//          edited: '2014-12-22T18:21:15.523587Z',
//          url: 'https://swapi.dev/api/vehicles/4/'
//       },
//       ...

type Vehicle = {
   name:          string,
   model:         string,
   length:        string,
   crew:          string,
   passengers:    string,
   vehicle_class: string,
   chart: {
      passengers: number,
      crew:       number,
      total?:     number,
      },
   };
type RawData = {
   next:    string,
   results: Vehicle[],
   };

const appWidgetSpaceVehicles = {
   displayDataChart(widgetElem: JQuery, vehicles: Vehicle[]): void {
      vehicles.forEach(item => item.chart = {
         passengers: parseInt(item.passengers) || 0,
         crew:       parseInt(item.crew) || 0,
         });
      vehicles.forEach(item => item.chart.total = item.chart.passengers + item.chart.crew);
      vehicles.sort((itemA, itemB) => <number>itemA.chart.total - <number>itemB.chart.total);
      const chartVehicles = vehicles.slice(-12, -4);  //8 relatively large vehicles
      const datasets = [
         { label: 'Passengers', data: chartVehicles.map(item => item.chart.passengers) },
         { label: 'Crew',       data: chartVehicles.map(item => item.chart.crew) },
         ];
      const chartInfo = <ChartConfiguration>{
         type: 'bar',
         data: {
            labels:   chartVehicles.map(item => item.name),
            datasets: app.util.addChartColors(datasets, 1),
            },
         options: {
            maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true } },
            plugins: {
               title: { display: true, text: ['Larger Vehicles', 'Passengers and crew capacity'] },
               },
            },
         };
      const canvas: ChartItem = widgetElem.find('canvas');
      widgetElem.data().chart = new Chart(canvas, chartInfo);
      },
   displayDataTable(widgetElem: JQuery, vehicles: Vehicle[]): void {
      const tableElem = widgetElem.find('figure table');
      const DataTable = globalThis['simpleDatatables'].DataTable;
      const dataTable = new DataTable(tableElem[0]);
      const headers = [
         'Name',
         'Model',
         'Length',
         'Crew',
         'Passengers',
         'Class',
         ];
      const tableVehicles = vehicles.map(vehicle => [
         vehicle.name,
         vehicle.model,
         vehicle.length,
         vehicle.crew,
         vehicle.passengers,
         vehicle.vehicle_class,
         ]);
      dataTable.insert({ headings: headers, data: tableVehicles });
      widgetElem.data().table = dataTable;
      },
   show(widgetElem: JQuery): void {
      const vehicles: Vehicle[] = [];
      const displayData = () => {
         app.util.spinnerStop(widgetElem);
         app.widget.spaceVehicles.displayDataChart(widgetElem, vehicles);
         app.widget.spaceVehicles.displayDataTable(widgetElem, vehicles);
         };
      const handleData = (data: RawData) => {
         vehicles.push(...data.results);
         if (data.next)
            fetchJson.get(data.next.replace('http://', 'https://')).then(handleData);
         else
            displayData();
         };
      const url = 'https://swapi.py4e.com/api/vehicles/';
      const params = { format: 'json' };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetSpaceVehicles };
