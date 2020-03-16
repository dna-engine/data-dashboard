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

app.widget.spaceStarships = {
   displayDataChart(widgetElem, starships) {
      starships.forEach(item => item.chart = {
         passengers: parseInt(item.passengers) || 0,
         crew:       parseInt(item.crew) || 0
         });
      starships.forEach(item => item.chart.total = item.chart.passengers + item.chart.crew);
      starships.sort((itemA, itemB) => itemA.chart.total - itemB.chart.total);
      const chartStarships = starships.slice(-11, -3);  //8 relatively large starships
      const datasets = [
         { label: 'Passengers', data: chartStarships.map(item => item.chart.passengers) },
         { label: 'Crew',       data: chartStarships.map(item => item.chart.crew) },
         ];
      const chartInfo = {
         type: 'bar',
         data: {
            labels:   chartStarships.map(item => item.name),
            datasets: app.util.addChartColors(datasets, 4),
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: ['Larger Starships', 'Passengers and crew capacity'] },
            scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
            },
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   displayDataTable(widgetElem, starships) {
      const tableElem = widgetElem.find('figure table');
      const dataTable = new window.simpleDatatables.DataTable(tableElem[0], {});  //see: github.com/fiduswriter/Simple-DataTables/issues/56
      const headers = [
         'Name',
         'Model',
         'Length',
         'Crew',
         'Passengers',
         'MGLT',
         'Class',
         ];
      const tableStarships = starships.map(item => [
         item.name,
         item.model,
         item.length,
         item.crew,
         item.passengers,
         item.MGLT,
         item.starship_class,
         ]);
      dataTable.insert({ headings: headers, data: tableStarships });
      widgetElem.data().table = dataTable;
      },
   show(widgetElem) {
      const starships = [];
      const displayData = () => {
         app.util.spinnerStop(widgetElem);
         app.widget.spaceStarships.displayDataChart(widgetElem, starships);
         app.widget.spaceStarships.displayDataTable(widgetElem, starships);
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
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };
