// DataDashboard
// Widget controller

import { Chart, ChartConfiguration, ChartItem } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app.js';

// {
//    count: 37,
//    next: 'https://swapi.dev/api/starships/?page=2&format=json',
//    previous: null,
//    results: [
//       {
//          name: 'Executor',
//          model: 'Executor-class star dreadnought',
//          manufacturer: 'Kuat Drive Yards, Fondor Shipyards',
//          cost_in_credits: '1143350000',
//          length: '19000',
//          max_atmosphering_speed: 'n/a',
//          crew: '279144',
//          passengers: '38000',
//          cargo_capacity: '250000000',
//          consumables: '6 years',
//          hyperdrive_rating: '2.0',
//          MGLT: '40',
//          starship_class: 'Star dreadnought',
//          pilots: [],
//          films: [
//             'https://swapi.dev/api/films/2/',
//             'https://swapi.dev/api/films/3/'
//          ],
//          created: '2014-12-15T12:31:42.547000Z',
//          edited: '2017-04-19T10:56:06.685592Z',
//          url: 'https://swapi.dev/api/starships/15/'
//       },
//       ...

type Starship = {
   name:           string,
   model:          string,
   length:         string,
   crew:           string,
   passengers:     string,
   MGLT:           string,
   starship_class: string,
   chart: {
      passengers: number,
      crew:       number,
      total?:     number,
      },
   };
type RawData = {
   next:    string,
   results: Starship[],
   };

const appWidgetSpaceStarships = {
   displayDataChart(widgetElem: JQuery, starships: Starship[]): void {
      starships.forEach(item => item.chart = {
         passengers: parseInt(item.passengers) || 0,
         crew:       parseInt(item.crew) || 0
         });
      starships.forEach(item => item.chart.total = item.chart.passengers + item.chart.crew);
      starships.sort((itemA, itemB) => <number>itemA.chart.total - <number>itemB.chart.total);
      const chartStarships = starships.slice(-11, -3);  //8 relatively large starships
      const datasets = [
         { label: 'Passengers', data: chartStarships.map(item => item.chart.passengers) },
         { label: 'Crew',       data: chartStarships.map(item => item.chart.crew) },
         ];
      const chartInfo = <ChartConfiguration>{
         type: 'bar',
         data: {
            labels:   chartStarships.map(item => item.name),
            datasets: app.util.addChartColors(datasets, 4),
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: ['Larger Starships', 'Passengers and crew capacity'] },
            scales: { x: { stacked: true }, y: { stacked: true } },
            },
         };
      const canvas: ChartItem = widgetElem.find('canvas');
      widgetElem.data().chart = new Chart(canvas, chartInfo);
      },
   displayDataTable(widgetElem: JQuery, starships: Starship[]): void {
      const tableElem = widgetElem.find('figure table');
      const DataTable = globalThis['simpleDatatables'].DataTable;
      const dataTable = new DataTable(tableElem[0]);
      const headers = [
         'Name',
         'Model',
         'Length',
         'Crew',
         'Passengers',
         'MGLT',
         'Class',
         ];
      const tableStarships = starships.map(starship => [
         starship.name,
         starship.model,
         starship.length,
         starship.crew,
         starship.passengers,
         starship.MGLT,
         starship.starship_class,
         ]);
      dataTable.insert({ headings: headers, data: tableStarships });
      widgetElem.data().table = dataTable;
      },
   show(widgetElem: JQuery): void {
      const starships: Starship[] = [];
      const displayData = () => {
         app.util.spinnerStop(widgetElem);
         app.widget.spaceStarships.displayDataChart(widgetElem, starships);
         app.widget.spaceStarships.displayDataTable(widgetElem, starships);
         };
      const handleData = (data: RawData) => {
         starships.push(...data.results);
         if (data.next)
            fetchJson.get(data.next.replace('http://', 'https://')).then(handleData);
         else
            displayData();
         };
      const url = 'https://swapi.py4e.com/api/starships/';
      const params = { format: 'json' };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetSpaceStarships };
