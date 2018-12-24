// DataDashboard
// Widget controller

// {
//    'Meta Data': {
//       '1. Information':    'FX Intraday (5min) Time Series',
//       '2. From Symbol':    'EUR',
//       '3. To Symbol':      'USD',
//       '4. Last Refreshed': '2018-12-21 22:00:00'
//       },
//    'Time Series FX (5min)': {
//       '2018-12-21 22:00:00': {
//          '1. open':  '1.1372',
//          '2. high':  '1.1372',
//          '3. low':   '1.1365',
//          '4. close': '1.1367'
//          },
//       '2018-12-21 21:55:00': {
//          '1. open':  '1.1365',
//          '2. high':  '1.1375',
//          '3. low':   '1.1364',
//          '4. close': '1.1368'
//          },
//       ...

dataDashboard.widget.finRateIntraday = {
   show: (widgetElem) => {
      const transform = (rawData) => {
         const metadata = rawData['Meta Data'];
         const timeSeries = rawData['Time Series FX (5min)'];
         const timestamps = Object.keys(timeSeries).sort();
         return {
            title:    metadata['1. Information'],
            subtitle: metadata['2. From Symbol'] + '/' + metadata['3. To Symbol'] + ' ' + metadata['4. Last Refreshed'],
            labels:   timestamps.map(timestamp => timestamp.substr(11, 5)),
            lows:     timestamps.map(timestamp => parseFloat(timeSeries[timestamp]['3. low'])),
            highs:    timestamps.map(timestamp => parseFloat(timeSeries[timestamp]['2. high']))
            };
         };
      const handleData = (rawData) => {
         const data = transform(rawData);
         const datasets = [
            { label: 'Low',  data: data.lows },
            { label: 'High', data: data.highs }
            ];
         const chartInfo = {
            type: 'line',
            data: {
               labels:   data.labels,
               datasets: dataDashboard.util.addChartColors(datasets)
               },
            options: {
               maintainAspectRatio: false,
               title: { display: true, text: [data.title, data.subtitle] }
               }
            };
         widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
         dataDashboard.util.spinnerStop(widgetElem);
         };
      const url = 'https://www.alphavantage.co/query';
      const params = { function: 'FX_INTRADAY', from_symbol: 'EUR', to_symbol: 'USD',
         interval: '5min', outputsize: 'full', apikey: 'demo' };
      dataDashboard.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      }
   };
