// DataDashboard
// Configuration

const dataDashboard = {
   widgets: [
      { code: 'fin-rate-intraday',   header: 'Exchange rate intraday' },
      { code: 'fin-rate-moving-avg', header: 'Exchange rate moving average' },
      { code: 'widget-c',            header: 'Widget C' },
      { code: 'network-log',         header: 'Network log' },
      { code: 'spacex-books',        header: 'SpaceX Books' }
      ],
   panels: [
      { code: 'space',   header: 'Space',       widgets: ['spacex-books'] },
      { code: 'finance', header: 'Finance',     widgets: ['fin-rate-moving-avg', 'fin-rate-intraday'] },
      { code: 'panel-z', header: 'The Z Panel', widgets: ['fin-rate-intraday', 'widget-c'] },
      { code: 'network', header: 'Network',     widgets: ['network-log'] }
      ],
   chartColor: {
      red:    'rgba(255,  99, 132, 0.5)',
      blue:   'rgba( 54, 162, 235, 0.5)',
      yellow: 'rgba(255, 206,  86, 0.5)',
      green:  'rgba( 75, 192, 192, 0.5)',
      purple: 'rgba(153, 102, 255, 0.5)',
      orange: 'rgba(255, 159,  64, 0.5)'
      }
   };

dataDashboard.widget = {};  //container map for widget controllers
