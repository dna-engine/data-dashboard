// DataDashboard
// Widget controller

// {
//    RestResponse: {
//       messages: [
//          "Total [55] records found."
//       ],
//       result: [
//          {
//             id: 1,
//             country: "USA",
//             name: "Alabama",
//             abbr: "AL",
//             area: "135767SKM",
//             largest_city: "Birmingham",
//             capital: "Montgomery"
//          },
//       ...

dataDashboard.widget.geoArea = {
   displayDataChart: (widgetElem, data) => {
      const size = 15;
      const title = 'Largest ' + size + ' States by Geographic Area';
      const subtitle = 'Country: ' + data[0].country;
      data.forEach(item => item.km2 = parseInt(item.area.slice(0, -3)));
      data.sort((itemA, itemB) => itemA.km2 - itemB.km2);
      data.splice(0, data.length - size);
      const dataset = {
         label:           'Square km',
         data:            data.map(item => item.km2),
         backgroundColor: dataDashboard.chartColor.orange
         };
      const chartInfo = {
         type: 'bar',
         data: {
            labels:   data.map(item => item.name),
            datasets: [dataset]
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [title, subtitle] },
            scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] }
            }
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      },
   show: (widgetElem) => {
      const url = 'http://services.groupkt.com/state/get/USA/all';
      const corsUrl = 'https://cors-anywhere.herokuapp.com/' + url;
      const handleData = (data) => {
         dataDashboard.util.spinnerStop(widgetElem);
         dataDashboard.widget.geoArea.displayDataChart(widgetElem, data.RestResponse.result);
         };
      dataDashboard.util.spinnerStart(widgetElem);
      fetchJson.get(corsUrl).then(handleData);
      }
   };
