// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { Chart, ChartConfiguration, ChartDataset, ChartTypeRegistry, TooltipItem } from 'chart.js';
import { fetchJson } from 'fetch-json';

// Modules
import { appUtil } from '../../modules/util';

// {
//    root: {
//       date: "12/31/2018",
//       time: "12:01:45 AM PST",
//       station: [
//          {
//             name: "Embarcadero",
//             abbr: "EMBR",
//             message: { error: Updates are temporarily unavailable. },
//             etd: [
//                {
//                   destination:  "Antioch",
//                   abbreviation: "ANTC",
//                   limited:      "0",
//                   estimate: [
//                      {
//                         minutes:   "25",
//                         platform:  "2",
//                         direction: "North",
//                         length:    "8",
//                         color:     "YELLOW",
//                         hexcolor:  "#ffff33",
//                         bikeflag:  "1",
//                         delay:     "0"
//                      }
//                   ]
//                },
//                ...

// Types
type Estimate = {
   destination: string,
   direction:   string,
   minutes:     string,
   platform:    string,
   };
type Station = {
   name:    string,
   abbr:    string,
   message: { error: string },
   etd: {
      destination: string,
      estimate:    Estimate[],
      }[],
   };
type RawData = {
   root: {
      date:    string,
      time:    string,
      station: Station[],
      },
   };
type DataPoint = {
   direction: string,
   minutes:   number,
   label:     string,
   delta?:    number,
   };
type DataSet$ = TooltipItem<keyof ChartTypeRegistry>['dataset'] & { labels: string[]};  //patch library type

const appWidgetTransBartDepartures = {
   displayDataChart(widgetElem: Element, timestamp: string, station: Station): void {
      const title =      station.abbr + ' -- Upcoming departures from ' + station.name;
      const subtitle =   timestamp;
      const yAxesLabel = 'Direction';
      const xAxesLabel = 'Estimated minutes until departure';
      const etd = station.etd || [];
      etd.forEach(dest => dest.estimate.forEach(est => est.destination = dest.destination));
      // const flatten = (a, b) => a.concat(b);
      const toChartData = (item: Estimate): DataPoint => ({
         direction: item.direction,
         minutes:   Number(item.minutes) || 0,
         label:     'Platform #' + item.platform + ' to ' + item.destination,
         });
      const compareMinutes = (a: DataPoint, b: DataPoint): number => a.minutes - b.minutes;
      const estimates = etd.map(destination =>
         destination.estimate).reduce((a, b) => a.concat(b), []).map(toChartData).sort(compareMinutes);
      const onlyUnique = (direction: string, i: number, array: string[]) =>
         array.indexOf(direction) === i;
      const directions = estimates.map(item => item.direction).filter(onlyUnique);
      const directionEstimates = directions.map(direction =>
         estimates.filter(item => item.direction === direction));
      const calcDelta = (estimate: DataPoint, i: number, estimates: DataPoint[]) =>
         estimate.delta = estimates[i]!.minutes - (i ? estimates[i - 1]!.minutes : 0) + 1;
      directionEstimates.forEach(de => de.forEach(calcDelta));
      const maxEstimates = Math.max(...directionEstimates.map(estimate => estimate.length));
      const padEstimates = (estimates: DataPoint[]) => {
         while (estimates.length < maxEstimates)
            estimates.push({ direction: '', minutes: 0, label: '', delta: 0 });
         };
      directionEstimates.forEach(padEstimates);
      const datasets: ChartDataset[] = [];
      while (datasets.length < maxEstimates)
         datasets.push(<ChartDataset>{
            label:  'Train ' + (datasets.length + 1),
            labels: directionEstimates.map(estimates => estimates[datasets.length]!.label),
            data:   directionEstimates.map(estimates => estimates[datasets.length]!.delta),
            });
      const scales = {
         x: { stacked: true, scaleLabel: { display: true, labelString: xAxesLabel } },
         y: { stacked: true, scaleLabel: { display: true, labelString: yAxesLabel } },
         };
      const makeTooltip = (item: TooltipItem<keyof ChartTypeRegistry>): string =>
         item.dataset.label + ': ' + (<DataSet$>item.dataset).labels[item.dataIndex];
      const chartInfo = <ChartConfiguration>{
         type: 'bar',
         data: {
            labels:   directions,
            datasets: appUtil.addChartColors(datasets),
            },
         options: {
            indexAxis:           'y',
            maintainAspectRatio: false,
            scales:              scales,
            plugins: {
               title:   { display: true, text: [title, subtitle] },
               tooltip: { callbacks: { label: makeTooltip } },
               },
            },
         };
      const canvas = widgetElem.querySelector('canvas')!;
      dna.dom.state(widgetElem).chart = new Chart(canvas, chartInfo);
      },
   show(widgetElem: Element): void {
      const handleData = (data: RawData) => {
         appUtil.spinnerStop(widgetElem);
         const timestamp = data.root.date + ' ' + data.root.time;
         const station = data.root.station[0]!;
         if (station.message?.error)
            console.log(url, station.message?.error);
         appWidgetTransBartDepartures.displayDataChart(widgetElem, timestamp, station);
         };
      const url = 'https://api.bart.gov/api/etd.aspx';
      const params = { cmd: 'etd', orig: 'embr', key: 'MW9S-E7SL-26DU-VV8V', json: 'y' };
      appUtil.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetTransBartDepartures };
