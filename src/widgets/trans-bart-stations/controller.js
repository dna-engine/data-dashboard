// DataDashboard
// Widget controller

// {
//    root: {
//       stations: {
//          station: [
//             {
//                name:           '12th St. Oakland City Center',
//                abbr:           '12TH',
//                gtfs_latitude:  '37.803768',
//                gtfs_longitude: '-122.271450',
//                address:        '1245 Broadway',
//                city:           'Oakland',
//                county:         'alameda',
//                state:          'CA',
//                zipcode:        '94612'
//             },
//             ...

app.widget.transBartStations = {
   displayDataChart(widgetElem, data) {
      const dataset = {
         label: 'Geolocation',
         backgroundColor: app.chartColor.green,
         data: data.map(item => ({
            x:     parseFloat(item.gtfs_longitude),
            y:     parseFloat(item.gtfs_latitude),
            label: item.abbr + ' (' + item.name + ')'
            }))
         };
      const makeTooltip = (item, data) => data.datasets[item.datasetIndex].data[item.index].label;
      const chartInfo = {
         type: 'scatter',
         data: {
            datasets: [dataset]
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: ['BART Stations', 'San Francisco Bay Area'] },
            tooltips: { callbacks: { label: makeTooltip } }
            }
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   displayDataTable(widgetElem, data) {
      const tableElem = widgetElem.find('figure table');
      const dataTable = new window.simpleDatatables.DataTable(tableElem[0], {});  //see: github.com/fiduswriter/Simple-DataTables/issues/56
      const headers = [
         'Name',
         'Code',
         'Latitude',
         'Longitude',
         'City',
         'County',
         ];
      const stations = data.map(item => [
         item.name,
         item.abbr,
         item.gtfs_latitude,
         item.gtfs_longitude,
         item.city,
         item.county,
         ]);
      dataTable.insert({ headings: headers, data: stations });
      widgetElem.data().table = dataTable;
      },
   show(widgetElem) {
      const handleData = (data) => {
         app.util.spinnerStop(widgetElem);
         const stations = data.root.stations.station;
         app.widget.transBartStations.displayDataChart(widgetElem, stations);
         app.widget.transBartStations.displayDataTable(widgetElem, stations);
         };
      const url = 'https://api.bart.gov/api/stn.aspx';
      const params = { cmd: 'stns', key: 'MW9S-E7SL-26DU-VV8V', json: 'y' };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };
