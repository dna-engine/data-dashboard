// DataDashboard
// Widget controller

// {
//    last_updated: 1546391115,
//    ttl: 10,
//    data: {
//       stations: [
//          {
//             station_id: "72",
//             num_bikes_available: 0,
//             num_ebikes_available: 0,
//             num_bikes_disabled: 2,
//             num_docks_available: 37,
//             num_docks_disabled: 0,
//             is_installed: 1,
//             is_renting: 1,
//             is_returning: 1,
//             last_reported: 1546388786,
//             eightd_has_available_keys: false
//          },
//          ...

dataDashboard.widget.transNycBikeStations = {
   displayDataChart: (widgetElem, data) => {
      const title =    'NYC Bike Stations';
      const subtitle = 'Capacity on ' + new Date(data.last_updated * 1000).toLocaleString();
      const stations = data.data.stations;
      stations.forEach(station => station.capacity =
         station.num_docks_available + station.num_bikes_available + station.num_bikes_disabled);
      stations.sort((a, b) => a.capacity - b.capacity);
      stations.forEach(station => station.reservedBikes =
         station.totalDocks - station.availableDocks - station.availableBikes);
      const datasets = [
         { label: 'Available docks', data: stations.map(station => station.num_docks_available) },
         { label: 'Available bikes', data: stations.map(station => station.num_bikes_available) },
         { label: 'Disabled bikes',  data: stations.map(station => station.num_bikes_disabled) },
         ];
      const chartInfo = {
         type: 'bar',
         data: {
            labels:   Array.from({ length: stations.length }, (value, i) => i + 1),
            datasets: dataDashboard.util.addChartColors(datasets, 3)
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [title, subtitle] },
            scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] }
            }
         };
      console.log(chartInfo);
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   show: (widgetElem) => {
      const url = 'https://gbfs.citibikenyc.com/gbfs/en/station_status.json';
      const handleData = (data) => {
         dataDashboard.util.spinnerStop(widgetElem);
         dataDashboard.widget.transNycBikeStations.displayDataChart(widgetElem, data);
         };
      dataDashboard.util.spinnerStart(widgetElem);
      fetchJson.get(url).then(handleData);
      }
   };
