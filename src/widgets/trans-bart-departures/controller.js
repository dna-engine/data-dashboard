// DataDashboard
// Widget controller

// {
//    root: {
//       date: "12/31/2018",
//       time: "12:01:45 AM PST",
//       station: [
//          {
//             name: "Embarcadero",
//             abbr: "EMBR",
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

dataDashboard.widget.transBartDepartures = {
   displayDataChart: (widgetElem, data) => {
      const titles = [
         data.station[0].abbr + ' -- Upcoming departures from ' + data.station[0].name,
         data.date + ' ' + data.time
         ];
      const etd = data.station[0].etd;
      etd.forEach(dest => dest.estimate.forEach(est => est.destination = dest.destination));
      const flatten = (a, b) => a.concat(b);
      const toChartData = (item) => ({
         direction: item.direction,
         minutes:   parseInt(item.minutes) || 0,
         label:     'Platform #' + item.platform + ' to ' + item.destination
         });
      const compareMinutes = (a, b) => a.minutes - b.minutes;
      const estimates = etd.map(destination => destination.estimate).reduce(flatten).map(toChartData).sort(compareMinutes);
      const onlyUnique = (value, i, array) => array.indexOf(value) === i;
      const directions = estimates.map(item => item.direction).filter(onlyUnique);
      const directionEstimates = directions.map(direction => estimates.filter(item => item.direction === direction));
      const calcDelta = (estimate, i, estimates) => estimate.delta = estimates[i].minutes - (i ? estimates[i - 1].minutes : 0) + 1;
      directionEstimates.forEach(de => de.forEach(calcDelta));
      const maxEstimates = Math.max(...directionEstimates.map(estimate => estimate.length));
      const padEstimates = (estimates) => {
         while (estimates.length < maxEstimates)
            estimates.push({ delta: 0 });
         };
      directionEstimates.forEach(padEstimates);
      const datasets = [];
      while (datasets.length < maxEstimates)
         datasets.push({
            label:  'Train ' + (datasets.length + 1),
            labels: directionEstimates.map(estimates => estimates[datasets.length].label),
            data:   directionEstimates.map(estimates => estimates[datasets.length].delta)
            });
      const scales = {
         xAxes: [{ stacked: true, scaleLabel: { display: true, labelString: 'Estimated minutes until departure' } }],
         yAxes: [{ stacked: true, scaleLabel: { display: true, labelString: 'Direction' } }]
         };
      const makeTooltip = (item, data) => data.datasets[item.datasetIndex].labels[item.index];
      const chartInfo = {
         type: 'horizontalBar',
         data: {
            labels:   directions,
            datasets: dataDashboard.util.addChartColors(datasets)
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: titles },
            scales: scales,
            tooltips: { callbacks: { label: makeTooltip } }
            }
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   show: (widgetElem) => {
      const handleData = (data) => {
         dataDashboard.util.spinnerStop(widgetElem);
         dataDashboard.widget.transBartDepartures.displayDataChart(widgetElem, data.root);
         };
      const url = 'https://api.bart.gov/api/etd.aspx';
      const params = { cmd: 'etd', orig: 'embr', key: 'MW9S-E7SL-26DU-VV8V', json: 'y' };
      dataDashboard.util.spinnerStart(widgetElem);
      // fetchJson.get(url, params).then(handleData);
      $.get(url, params).done(handleData);  //TODO: solve not allowed by Access-Control-Allow-Origin, Fetch API cannot load due to access control checks.
      }
   };
