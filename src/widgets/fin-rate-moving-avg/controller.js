// DataDashboard
// Widget controller

// {
//    'Meta Data': {
//       '1: Symbol': 'USDEUR',
//       '2: Indicator': 'Simple Moving Average (SMA)',
//       '3: Last Refreshed': '2018-12-21'
//    },
//    'Technical Analysis: SMA': {
//       '2018-12-21': {
//          'SMA': '0.8773'
//       },
//       '2018-12-14': {
//          'SMA': '0.8757'
//       },
//       ...

app.widget.finRateMovingAvg = {
   displayDataChart: (widgetElem, rawData) => {
      const transform = (rawData) => {
         const metadata = rawData['Meta Data'];
         const timeSeries = rawData['Technical Analysis: SMA'];
         const timestamps = Object.keys(timeSeries).sort();
         return {
            title:    metadata['2: Indicator'],
            subtitle: metadata['3: Last Refreshed'],
            set:      metadata['1: Symbol'],
            labels:   timestamps,
            values:   timestamps.map(timestamp => parseFloat(timeSeries[timestamp].SMA))
            };
         };
      const data = transform(rawData);
      const dataset = {
         label:           data.set,
         data:            data.values,
         borderColor:     app.chartColor.purple,
         backgroundColor: app.chartColor.purple
         };
      const chartInfo = {
         type: 'line',
         data: {
            labels:   data.labels,
            datasets: [dataset]
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [data.title, data.subtitle] }
            }
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   show: (widgetElem) => {
      const handleData = (rawData) => {
         app.util.spinnerStop(widgetElem);
         if (!rawData['Error Message'])
            app.widget.finRateMovingAvg.displayDataChart(widgetElem, rawData);
         };
      const url = 'https://www.alphavantage.co/query';
      const params = { function: 'SMA', symbol: 'USDEUR',
         interval: 'weekly', time_period: 10, series_type: 'open', apikey: 'demo' };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      }
   };
