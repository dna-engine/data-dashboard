// DataDashboard
// Widget controller

dataDashboard.widget.widgetA = {
   show: (widgetElem) => {
      const context = widgetElem.find('canvas');
      const chartInfo = {
         type: 'bar',
         data: {
            labels: Object.keys(dataDashboard.chartColor),
            datasets: [{
               label: 'Things',
               data: [12, 19, 3, 5, 2, 3],
               backgroundColor: dataDashboard.chartColors
               }]
            },
         options: {
            maintainAspectRatio: false,
            scales: {
               yAxes: [{ ticks: { beginAtZero: true } }]
               }
            }
         };
      widgetElem.data().chart = new window.Chart(context, chartInfo);
      }
   };
