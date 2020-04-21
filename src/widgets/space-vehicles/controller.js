// DataDashboard
// Widget controller

// {
//    count: 39,
//    next: 'https://swapi.dev/api/vehicles/?page=2&format=json',
//    previous: null,
//    results: [
//       {
//          name: 'Sand Crawler',
//          model: 'Digger Crawler',
//          manufacturer: 'Corellia Mining Corporation',
//          cost_in_credits: '150000',
//          length: '36.8',
//          max_atmosphering_speed: '30',
//          crew: '46',
//          passengers: '30',
//          cargo_capacity: '50000',
//          consumables: '2 months',
//          vehicle_class: 'wheeled',
//          pilots: [],
//          films: [
//             'https://swapi.dev/api/films/5/',
//             'https://swapi.dev/api/films/1/'
//          ],
//          created: '2014-12-10T15:36:25.724000Z',
//          edited: '2014-12-22T18:21:15.523587Z',
//          url: 'https://swapi.dev/api/vehicles/4/'
//       },
//       ...

app.widget.spaceVehicles = {
   displayDataChart(widgetElem, vehicles) {
      vehicles.forEach(item => item.chart = {
         passengers: parseInt(item.passengers) || 0,
         crew:       parseInt(item.crew) || 0,
         });
      vehicles.forEach(item => item.chart.total = item.chart.passengers + item.chart.crew);
      vehicles.sort((itemA, itemB) => itemA.chart.total - itemB.chart.total);
      const chartVehicles = vehicles.slice(-12, -4);  //8 relatively large vehicles
      const datasets = [
         { label: 'Passengers', data: chartVehicles.map(item => item.chart.passengers) },
         { label: 'Crew',       data: chartVehicles.map(item => item.chart.crew) },
         ];
      const chartInfo = {
         type: 'bar',
         data: {
            labels:   chartVehicles.map(item => item.name),
            datasets: app.util.addChartColors(datasets, 1),
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: ['Larger Vehicles', 'Passengers and crew capacity'] },
            scales: { x: { stacked: true }, y: { stacked: true } },
            },
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   displayDataTable(widgetElem, vehicles) {
      const tableElem = widgetElem.find('figure table');
      const dataTable = new window.simpleDatatables.DataTable(tableElem[0]);
      const headers = [
         'Name',
         'Model',
         'Length',
         'Crew',
         'Passengers',
         'Class',
         ];
      const tableVehicles = vehicles.map(item => [
         item.name,
         item.model,
         item.length,
         item.crew,
         item.passengers,
         item.vehicle_class,
         ]);
      dataTable.insert({ headings: headers, data: tableVehicles });
      widgetElem.data().table = dataTable;
      },
   show(widgetElem) {
      const vehicles = [];
      const displayData = () => {
         app.util.spinnerStop(widgetElem);
         app.widget.spaceVehicles.displayDataChart(widgetElem, vehicles);
         app.widget.spaceVehicles.displayDataTable(widgetElem, vehicles);
         };
      const handleData = (data) => {
         vehicles.push(...data.results);
         if (data.next)
            fetchJson.get(data.next.replace('http://', 'https://')).then(handleData);
         else
            displayData();
         };
      const url = 'https://swapi.dev/api/vehicles/';
      const params = { format: 'json' };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };
