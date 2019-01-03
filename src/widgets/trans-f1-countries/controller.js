// DataDashboard
// Widget controller

// {
//    MRData: {
//       xmlns: "http://ergast.com/mrd/1.4",
//       series: "f1",
//       url: "http://ergast.com/api/f1/2018/1/results.json",
//       limit: "30",
//       offset: "0",
//       total: "20",
//       RaceTable: {
//          season: "2018",
//          round: "1",
//          Races: [
//             {
//                season: "2018",
//                round: "1",
//                url: "https://en.wikipedia.org/wiki/2018_Australian_Grand_Prix",
//                raceName: "Australian Grand Prix",
//                Circuit: {
//                   circuitId: "albert_park",
//                   url: "http://en.wikipedia.org/wiki/Melbourne_Grand_Prix_Circuit",
//                   circuitName: "Albert Park Grand Prix Circuit",
//                   Location: {
//                      lat: "-37.8497",
//                      long: "144.968",
//                      locality: "Melbourne",
//                      country: "Australia"
//                   }
//                },
//                date: "2018-03-26",
//                time: "05:00:00Z",
//                Results: [
//                   {
//                      number: "5",
//                      position: "1",
//                      positionText: "1",
//                      points: "25",
//                      Driver: {
//                         driverId: "vettel",
//                         permanentNumber: "5",
//                         code: "VET",
//                         url: "http://en.wikipedia.org/wiki/Sebastian_Vettel",
//                         givenName: "Sebastian",
//                         familyName: "Vettel",
//                         dateOfBirth: "1987-07-03",
//                         nationality: "German"
//                      },
//                      Constructor: {
//                         constructorId: "ferrari",
//                         url: "http://en.wikipedia.org/wiki/Scuderia_Ferrari",
//                         name: "Ferrari",
//                         nationality: "Italian"
//                      },
//                      grid: "2",
//                      laps: "57",
//                      status: "Finished",
//                      Time: {
//                         millis: "5051672",
//                         time: "1:24:11.672"
//                      },
//                      FastestLap: {
//                         rank: "3",
//                         lap: "53",
//                         Time: {
//                            time: "1:26.638"
//                         },
//                         AverageSpeed: {
//                            units: "kph",
//                            speed: "220.351"
//                         }
//                      }
//                   },
//                   ...
//       ...


// const results = [
//    { Driver: { nationality: 'German' }, Constructor: { nationality: 'Italian' } },
//    { Driver: { nationality: 'German' }, Constructor: { nationality: 'French' } }
// ];

dataDashboard.widget.transF1TopCountries = {
   displayDataChart: (widgetElem, race) => {
      const topFinishes = 10;
      const title =    'Nationalities of Top F1 Drivers and Constructors';
      const subtitle = race.season + ' ' + race.raceName + ' top ' + topFinishes + ' finishes';
      const round =    parseInt(race.round);
      const addResult = (totalsMap, result) => {
         const setupNationality = (nationality) => {
            if (!totalsMap[nationality])
               totalsMap[nationality] = { nationality: nationality, numDrivers: 0, numConstructors: 0 };
            };
         [result.Driver.nationality, result.Constructor.nationality].forEach(setupNationality);
         totalsMap[result.Driver.nationality].numDrivers++;
         totalsMap[result.Constructor.nationality].numConstructors++;
         return totalsMap;
         };
      const totals = race.Results.slice(0, topFinishes).reduce(addResult, {});
      const data = Object.keys(totals).map(nationality => totals[nationality]);
      data.sort((a, b) => a.numDrivers + a.numConstructors - b.numDrivers - b.numConstructors ||
         a.nationality.localeCompare(b.nationality));
      const datasets = [
         { label: 'Driver',      data: data.map(item => item.numDrivers) },
         { label: 'Constructor', data: data.map(item => item.numConstructors) }
         ];
      const chartInfo = {
         type: 'bar',
         data: {
            labels:   data.map(item => item.nationality),
            datasets: dataDashboard.util.addChartColors(datasets)
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [title, subtitle] },
            scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] }
            }
         };
      const canvas = widgetElem.find('canvas').eq(round - 1);
      widgetElem.data().chart = new window.Chart(canvas, chartInfo);
      },
   show: (widgetElem) => {
      const raceYear = new Date().getFullYear() - 1;
      const handleData = (data) => {
         dataDashboard.util.spinnerStop(widgetElem);
         const race = data.MRData.RaceTable.Races[0];
         dataDashboard.widget.transF1TopCountries.displayDataChart(widgetElem, race);
         };
      dataDashboard.util.spinnerStart(widgetElem);
      const display = (round) => {
         const url = 'https://ergast.com/api/f1/' + raceYear + '/' + round + '/results.json';
         fetchJson.get(url).then(handleData);
         };
      widgetElem.find('widget-body >figure >canvas').each(i => display(i + 1));
      }
   };
