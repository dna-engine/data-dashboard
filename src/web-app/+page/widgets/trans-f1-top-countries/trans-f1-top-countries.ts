// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { Chart, ChartConfiguration } from 'chart.js';
import { fetchJson } from 'fetch-json';

// Modules
import { webAppUtil } from '../../modules/util';

// {
//    MRData: {
//       xmlns: "http://ergast.com/mrd/1.4",
//       series: "f1",
//       url: "http://ergast.com/api/f1/2018/1/results.json",
//       limit: "30",
//       offset: "0",
//       total: "20",
//       RaceTable: {
//          season: "2018",
//          round: "1",
//          Races: [
//             {
//                season: "2018",
//                round: "1",
//                url: "https://en.wikipedia.org/wiki/2018_Australian_Grand_Prix",
//                raceName: "Australian Grand Prix",
//                Circuit: {
//                   circuitId: "albert_park",
//                   url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
//                   circuitName: "Albert Park Grand Prix Circuit",
//                   Location: {
//                      lat: "-37.8497",
//                      long: "144.968",
//                      locality: "Melbourne",
//                      country: "Australia"
//                   }
//                },
//                date: "2018-03-26",
//                time: "05:00:00Z",
//                Results: [
//                   {
//                      number: "5",
//                      position: "1",
//                      positionText: "1",
//                      points: "25",
//                      Driver: {
//                         driverId: "vettel",
//                         permanentNumber: "5",
//                         code: "VET",
//                         url: "http://en.wikipedia.org/wiki/Sebastian_Vettel",
//                         givenName: "Sebastian",
//                         familyName: "Vettel",
//                         dateOfBirth: "1987-07-03",
//                         nationality: "German"
//                      },
//                      Constructor: {
//                         constructorId: "ferrari",
//                         url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
//                         name: "Ferrari",
//                         nationality: "Italian"
//                      },
//                      grid: "2",
//                      laps: "57",
//                      status: "Finished",
//                      Time: {
//                         millis: "5051672",
//                         time: "1:24:11.672"
//                      },
//                      FastestLap: {
//                         rank: "3",
//                         lap: "53",
//                         Time: {
//                            time: "1:26.638"
//                         },
//                         AverageSpeed: {
//                            units: "kph",
//                            speed: "220.351"
//                         }
//                      }
//                   },
//                   ...
//       ...

// const results = [
//    { Driver: { nationality: 'German' }, Constructor: { nationality: 'Italian' } },
//    { Driver: { nationality: 'German' }, Constructor: { nationality: 'French' } },
// ];

// Types
type Race = {
   season:   string,
   raceName: string,
   round:    string,
   Results: {
      Driver:      { nationality: string },
      Constructor: { nationality: string },
      }[],
   };
type RawData = {
   MRData: { RaceTable: { Races: Race[] } },
   };
type TotalsMap = {
   [nationality: string]: {
      nationality:     string,
      numDrivers:      number,
      numConstructors: number,
      },
   };

const webAppWidgetTransF1TopCountries = {
   displayDataChart(widgetElem: Element, race: Race): void {
      // <web-app-widget-body class=trans-f1-top-countries>
      //    <figure>
      //       <canvas></canvas>
      //    </figure>
      //    <figure>
      //       <canvas></canvas>
      //    </figure>
      //    <figure>
      //       <canvas></canvas>
      //    </figure>
      // </web-app-widget-body>
      const topFinishes = 10;
      const title =    'Nationalities of Top F1 Drivers and Constructors';
      const subtitle = race.season + ' ' + race.raceName + ' top ' + topFinishes + ' finishes';
      const round =    Number(race.round);
      const addResult = (totalsMap: TotalsMap, result: Race['Results'][0]) => {
         const setupNationality = (nationality: string) => {
            if (!totalsMap[nationality])
               totalsMap[nationality] = {
                  nationality:     nationality,
                  numDrivers:      0,
                  numConstructors: 0,
                  };
            };
         [result.Driver.nationality, result.Constructor.nationality].forEach(setupNationality);
         totalsMap[result.Driver.nationality]!.numDrivers++;
         totalsMap[result.Constructor.nationality]!.numConstructors++;
         return totalsMap;
         };
      const totals = race.Results.slice(0, topFinishes).reduce(addResult, {});
      const data = Object.keys(totals).map(nationality => totals[nationality]!);
      data.sort((a, b) => a!.numDrivers + a!.numConstructors - b!.numDrivers - b!.numConstructors ||
         a!.nationality.localeCompare(b!.nationality));
      const datasets = [
         { label: 'Driver',      data: data.map(item => item.numDrivers) },
         { label: 'Constructor', data: data.map(item => item.numConstructors) },
         ];
      const chartInfo = <ChartConfiguration>{
         type: 'bar',
         data: {
            labels:   data.map(item => item.nationality),
            datasets: webAppUtil.addChartColors(datasets),
            },
         options: {
            maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true } },
            plugins: {
               title: { display: true, text: [title, subtitle] },
               },
            },
         };
      const canvas = widgetElem.querySelectorAll('canvas')[round - 1]!;
      dna.dom.state(widgetElem).chart = new Chart(canvas, chartInfo);
      },
   show(widgetElem: Element): void {
      const raceYear = new Date().getFullYear() - 1;
      const handleData = (data: RawData) => {
         webAppUtil.spinnerStop(widgetElem);
         const race = data.MRData.RaceTable.Races[0]!;
         webAppWidgetTransF1TopCountries.displayDataChart(widgetElem, race);
         };
      webAppUtil.spinnerStart(widgetElem);
      const display = (canvas: Element, index: number) => {
         const round = index + 1;
         const url = 'https://ergast.com/api/f1/' + raceYear + '/' + round + '/results.json';
         fetchJson.get(url).then(handleData);
         };
      widgetElem.querySelectorAll('web-app-widget-body >figure >canvas').forEach(display);
      },
   };

export { webAppWidgetTransF1TopCountries };
