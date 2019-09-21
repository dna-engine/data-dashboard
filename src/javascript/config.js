// DataDashboard
// Configuration

const dataDashboard = {
   widgets: [
      { code: 'fin-rate-intraday',       header: 'Exchange rate intraday' },
      { code: 'fin-rate-moving-avg',     header: 'Exchange rate moving average' },
      { code: 'network-log',             header: 'Network log' },
      { code: 'network-endpoints',       header: 'REST endpoints' },
      { code: 'project-contributors',    header: 'dna.js contributors' },
      { code: 'project-json-questions',  header: 'JSON questions' },
      { code: 'spacex-books',            header: 'SpaceX books' },
      { code: 'spacex-pics',             header: 'SpaceX pictures' },
      { code: 'space-starships',         header: 'Starship data' },
      { code: 'space-vehicles',          header: 'Vehicle data' },
      { code: 'trans-bart-stations',     header: 'BART stations' },
      { code: 'trans-bart-departures',   header: 'BART departures' },
      { code: 'trans-f1-top-countries',  header: 'F1 top countries'},
      { code: 'trans-nyc-bike-stations', header: 'NYC bike stations' }
      ],
   panels: [
      { code: 'finance',   header: 'Finance',        display: true,  widgets: ['fin-rate-moving-avg', 'fin-rate-intraday'] },
      { code: 'space',     header: 'Space',          display: true,  widgets: ['spacex-books', 'spacex-pics'] },
      { code: 'starships', header: 'Starships',      display: true,  widgets: ['space-starships', 'space-vehicles'] },
      { code: 'trans',     header: 'Transportation', display: true,  widgets: ['trans-nyc-bike-stations', 'trans-bart-stations', 'trans-bart-departures', 'trans-f1-top-countries'] },
      { code: 'project',   header: 'Project',        display: true,  widgets: ['project-contributors', 'project-json-questions'] },
      { code: 'tbd',       header: 'TBD',            display: false, widgets: ['wip-widget'] },
      { code: 'network',   header: 'Network',        display: true,  widgets: ['network-log', 'network-endpoints'] }
      ],
   chartColor: {
      red:    'rgba(255,  99, 132, 0.7)',
      blue:   'rgba( 54, 162, 235, 0.7)',
      yellow: 'rgba(255, 206,  86, 0.7)',
      green:  'rgba( 75, 192, 192, 0.7)',
      purple: 'rgba(153, 102, 255, 0.7)',
      orange: 'rgba(255, 159,  64, 0.7)',
      teal:   'rgba(  0, 200, 230, 0.7)'
      }
   };

dataDashboard.widget = {};  //container map for widget controllers
