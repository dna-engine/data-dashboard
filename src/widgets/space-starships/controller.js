// DataDashboard
// Widget controller

// {
//    count: 37,
//    next: 'https://swapi.co/api/starships/?page=2&format=json',
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
//             'https://swapi.co/api/films/2/',
//             'https://swapi.co/api/films/3/'
//          ],
//          created: '2014-12-15T12:31:42.547000Z',
//          edited: '2017-04-19T10:56:06.685592Z',
//          url: 'https://swapi.co/api/starships/15/'
//       },
//       ...

dataDashboard.widget.spaceStarships = {
   show: (widgetElem) => {
      const starships = [];
      const displayDataChart = () => {
         starships.forEach(ship => ship.chart = {
            passengers: parseInt(ship.passengers) || 0,
            crew:       parseInt(ship.crew) || 0
            });
         starships.forEach(ship => ship.chart.total = ship.chart.passengers + ship.chart.crew);
         starships.sort((shipA, shipB) => shipA.chart.total - shipB.chart.total);
         const chartStarships = starships.slice(-11, -3);  //8 relatively large ships
         console.log('chartStarships:', chartStarships.length, chartStarships);
         console.log(chartStarships.map(ship => ship.chart.passengers));
         console.log(chartStarships.map(ship => ship.chart.crew));
         console.log(chartStarships.map(ship => ship.chart.total));
         const datasets = [
            {
               label:           'Passengers',
               data:            chartStarships.map(ship => ship.chart.passengers),
               backgroundColor: dataDashboard.chartColor.orange
               },
            {
               label:           'Crew',
               data:            chartStarships.map(ship => ship.chart.crew),
               backgroundColor: dataDashboard.chartColor.purple
               }
            ];
         const chartInfo = {
            type: 'bar',
            data: {
               labels:   chartStarships.map(ship => ship.name),
               datasets: datasets
               },
            options: {
               maintainAspectRatio: false,
               title: { display: true, text: ['Larger Starships', 'Passengers and crew capacity'] },
               scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] }
               }
            };
         widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
         };
      const displayDataTable = () => {
         const tableElem = widgetElem.find('figure table');
         const dataTable = new window.DataTable(tableElem[0]);
         const headers =   [
            'Name',
            'Model',
            'Length',
            'Crew',
            'Passengers',
            'MGLT',
            'Class'
            ];
         const tableStarships = starships.map(ship => [
            ship.name,
            ship.model,
            ship.length,
            ship.crew,
            ship.passengers,
            ship.MGLT,
            ship.starship_class
            ]);
         dataTable.insert({ headings: headers, data: tableStarships });
         widgetElem.data().table = dataTable;
         };
      const displayData = () => {
         console.log('starships:', starships);
         displayDataChart();
         displayDataTable();
         dataDashboard.util.spinnerStop(widgetElem);
         };
      const handleData = (data) => {
         starships.push(...data.results);
         if (data.next)
            fetchJson.get(data.next).then(handleData);
         else
            displayData();
         };
      const url = 'https://swapi.co/api/starships';
      const params = { format: 'json' };
      dataDashboard.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      }
   };
