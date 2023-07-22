// DataDashboard ~~ MIT License
// Configuration

export type AppWidget =     typeof appConfig.widgets[number];
export type AppPanel =      (typeof appConfig.panels[number]) & { widgetList?: AppWidget[] };
export type AppChartColor = typeof appConfig.chartColors[number];

const appConfig = {
   widgets: [
      { code: 'fin-rate-intraday',       header: 'Exchange rate intraday' },
      { code: 'fin-rate-moving-avg',     header: 'Exchange rate moving average' },
      { code: 'network-endpoints',       header: 'REST endpoints' },
      { code: 'network-log',             header: 'Network log' },
      { code: 'network-rest-tool',       header: 'REST tool' },
      { code: 'project-contributors',    header: 'dna-engine contributors' },
      { code: 'project-json-questions',  header: 'JSON questions' },
      { code: 'space-starships',         header: 'Starship data' },
      { code: 'space-vehicles',          header: 'Vehicle data' },
      { code: 'spacex-books',            header: 'SpaceX books' },
      { code: 'trans-bart-departures',   header: 'BART departures' },
      { code: 'trans-bart-stations',     header: 'BART stations' },
      { code: 'trans-f1-top-countries',  header: 'F1 top countries'},
      { code: 'trans-nyc-bike-stations', header: 'NYC bike stations' },
      ],
   panels: [
      { code: 'starships', header: 'Starships',      display: true,  widgets: ['space-starships', 'space-vehicles'] },
      { code: 'space',     header: 'Space',          display: true,  widgets: ['spacex-books'] },
      { code: 'trans',     header: 'Transportation', display: true,  widgets: ['trans-nyc-bike-stations', 'trans-bart-stations', 'trans-bart-departures', 'trans-f1-top-countries'] },
      { code: 'finance',   header: 'Finance',        display: true,  widgets: ['fin-rate-moving-avg', 'fin-rate-intraday'] },
      { code: 'project',   header: 'Project',        display: true,  widgets: ['project-contributors', 'project-json-questions'] },
      { code: 'tbd',       header: 'TBD',            display: false, widgets: ['wip-widget'] },
      { code: 'network',   header: 'Network',        display: true,  widgets: ['network-log', 'network-endpoints', 'network-rest-tool'] },
      ],
   chartColors: [
      { code: 'red',    value: 'rgba(255,  99, 132, 0.7)' },
      { code: 'blue',   value: 'rgba( 54, 162, 235, 0.7)' },
      { code: 'yellow', value: 'rgba(255, 206,  86, 0.7)' },
      { code: 'green',  value: 'rgba( 75, 192, 192, 0.7)' },
      { code: 'purple', value: 'rgba(153, 102, 255, 0.7)' },
      { code: 'orange', value: 'rgba(255, 159,  64, 0.7)' },
      { code: 'teal',   value: 'rgba(  0, 200, 230, 0.7)' },
      ],
   };

export { appConfig };
