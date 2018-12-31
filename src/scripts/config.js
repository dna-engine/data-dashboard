// DataDashboard
// Configuration

const dataDashboard = {
   widgets: [
      { code: 'fin-rate-intraday',    header: 'Exchange rate intraday' },
      { code: 'fin-rate-moving-avg',  header: 'Exchange rate moving average' },
      { code: 'widget-c',             header: 'Widget C' },
      { code: 'network-log',          header: 'Network log' },
      { code: 'network-endpoints',    header: 'REST endpoints' },
      { code: 'project-contributors', header: 'dna.js contributors' },
      { code: 'spacex-books',         header: 'SpaceX books' },
      { code: 'spacex-pics',          header: 'SpaceX pictures' },
      { code: 'space-starships',      header: 'Starship data' },
      { code: 'space-vehicles',       header: 'Vehicle data' },
      { code: 'trans-bart-stations',  header: 'BART stations' }
      ],
   panels: [
      { code: 'finance',   header: 'Finance',        widgets: ['fin-rate-moving-avg', 'fin-rate-intraday'] },
      { code: 'space',     header: 'Space',          widgets: ['spacex-books', 'spacex-pics'] },
      { code: 'starships', header: 'Starships',      widgets: ['space-starships', 'space-vehicles'] },
      { code: 'trans',     header: 'Transportation', widgets: ['trans-bart-stations'] },
      { code: 'project',   header: 'Project',        widgets: ['project-contributors'] },
      { code: 'network',   header: 'Network',        widgets: ['network-log', 'network-endpoints'] }
      ],
   chartColor: {
      red:    'rgba(255,  99, 132, 0.7)',
      blue:   'rgba( 54, 162, 235, 0.7)',
      yellow: 'rgba(255, 206,  86, 0.7)',
      green:  'rgba( 75, 192, 192, 0.7)',
      purple: 'rgba(153, 102, 255, 0.7)',
      orange: 'rgba(255, 159,  64, 0.7)'
      }
   };

dataDashboard.widget = {};  //container map for widget controllers
