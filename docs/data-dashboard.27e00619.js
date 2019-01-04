//! data-dashboard v0.0.1 ~~ https://github.com/dnajs/data-dashboard ~~ MIT License
function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _typeof(a){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}var dataDashboard={widgets:[{code:"fin-rate-intraday",header:"Exchange rate intraday"},{code:"fin-rate-moving-avg",header:"Exchange rate moving average"},{code:"geo-area",header:"Geographic area"},{code:"network-log",header:"Network log"},{code:"network-endpoints",header:"REST endpoints"},{code:"project-contributors",header:"dna.js contributors"},{code:"project-json-questions",header:"JSON questions"},{code:"spacex-books",header:"SpaceX books"},{code:"spacex-pics",header:"SpaceX pictures"},{code:"space-starships",header:"Starship data"},{code:"space-vehicles",header:"Vehicle data"},{code:"trans-bart-stations",header:"BART stations"},{code:"trans-bart-departures",header:"BART departures"},{code:"trans-f1-top-countries",header:"F1 top countries"},{code:"trans-nyc-bike-stations",header:"NYC bike stations"}],panels:[{code:"finance",header:"Finance",widgets:["fin-rate-moving-avg","fin-rate-intraday"]},{code:"space",header:"Space",widgets:["spacex-books","spacex-pics"]},{code:"starships",header:"Starships",widgets:["space-starships","space-vehicles"]},{code:"trans",header:"Transportation",widgets:["trans-nyc-bike-stations","trans-bart-stations","trans-bart-departures","trans-f1-top-countries","geo-area"]},{code:"project",header:"Project",widgets:["project-contributors","project-json-questions"]},{code:"network",header:"Network",widgets:["network-log","network-endpoints"]}],chartColor:{red:"rgba(255,  99, 132, 0.7)",blue:"rgba( 54, 162, 235, 0.7)",yellow:"rgba(255, 206,  86, 0.7)",green:"rgba( 75, 192, 192, 0.7)",purple:"rgba(153, 102, 255, 0.7)",orange:"rgba(255, 159,  64, 0.7)",teal:"rgba(  0, 200, 230, 0.7)"}};dataDashboard.widget={},dataDashboard.util={chartColors:Object.keys(dataDashboard.chartColor).map(function(a){return dataDashboard.chartColor[a]}),getChartColor:function b(a){return dataDashboard.util.chartColors[a%dataDashboard.util.chartColors.length]},addChartColors:function d(a,b){var c=b?b:0;return a.forEach(function d(a,b){a.fill=!1,a.borderColor=dataDashboard.util.getChartColor(b+c),a.backgroundColor=dataDashboard.util.getChartColor(b+c)}),a},narrowScreenSaver:function e(a,b){var c=Object.assign({maxPoints:200,screenWidth:700},b),d=Math.ceil(a.data.labels.length/c.maxPoints);return 1<d&&$(window.document).width()<c.screenWidth&&function c(){var b=function(a){return a.filter(function(a,b){return 0==b%d})};a.data.labels=b(a.data.labels),a.data.datasets.forEach(function(a){return a.data=b(a.data)})}(),a},secsToStr:function b(a){return new Date(1e3*a).toISOString().replace("T"," ").substring(0,19)},spinnerStart:function d(a){var b=a.addClass("waiting").find(">widget-spinner"),c=b.length?b:function b(){return library.ui.makeIcons($("<widget-spinner><i data-icon=yin-yang class=fa-spin>").css({paddingTop:a.height()/2-50})).appendTo(a)}();return c.hide().fadeIn().parent()},spinnerStop:function b(a){return a.removeClass("waiting").find(">widget-spinner").fadeOut(1500).parent()},fetchJsonp:function f(a,b,c,d){var e=a.replace(/.*:[/][/]/,"").replace(/[:/].*/,"");dataDashboard.network.logEvent(new Date().toISOString(),"request","GET",e,a);return b&&(a=a+"?"+Object.keys(b).map(function c(a){return a+"="+encodeURIComponent(b[a])}).join("&")),$.ajax({url:a,dataType:"jsonp",jsonpCallback:c}).done(d)}},dataDashboard.network={logName:"network-log",logEvent:function e(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];console.log(b.join(" - "));var d=dataDashboard.network.getLog();for(d.push(b);d.length>250;)d.shift();localStorage.setItem(dataDashboard.network.logName,JSON.stringify(d))},getLog:function a(){return JSON.parse(localStorage.getItem(dataDashboard.network.logName)||"[]")}},dataDashboard.transformer={dataTablesNormalizer:function e(a,b,c){var d=b?b:a.length?a[0].length:0;return a.forEach(function e(a){var b=function(b,c){"string"!=typeof b&&(a[c]=["boolean","number"].includes(_typeof(b))?""+b:"")};for(a.forEach(b),void 0!==c&&a.splice(c,1);a.length<d;)a.push("");for(;a.length>d;)a.pop()}),a}},dataDashboard.controller={showPanel:function b(a){a.find(">dashboard-widgets").children().each(function f(a,b){var c=$(b),d=dna.getModel(c);c.find(">widget-body").remove(),c.append(dna.clone(d.code,{}));var e=dataDashboard.widget[dna.util.toCamel(d.code)];if(!e)throw Error("DataDashboard - Widget controller missing: "+d.code);e.show(c)})},jsdomWorkarounds:function a(){fetchJson.enableLogger(!0);window.Chart=function a(){_classCallCheck(this,a)}},setup:function b(){fetchJson.enableLogger(dataDashboard.network.logEvent),navigator.userAgent.includes("jsdom")&&dataDashboard.controller.jsdomWorkarounds(),dataDashboard.widgetsMap=dna.array.toMap(dataDashboard.widgets);var a=function(a){return a.map(function(a){return dataDashboard.widgetsMap[a]})};dataDashboard.panels.forEach(function(b){return b.widgetList=a(b.widgets)}),library.ui.autoDisableButtons();$(function a(){dna.clone("dashboard-menu-item",dataDashboard.panels),dna.clone("dashboard-panel",dataDashboard.panels)})}},dataDashboard.controller.setup(),dataDashboard.widget.finRateIntraday={displayDataChart:function f(a,b){var c=function e(a){var b=a["Meta Data"],c=a["Time Series FX (5min)"],d=Object.keys(c).sort();return{title:b["1. Information"],subtitle:b["2. From Symbol"]+"/"+b["3. To Symbol"]+" "+b["4. Last Refreshed"],labels:d.map(function(a){return a.substring(11,16)}),lows:d.map(function(a){return parseFloat(c[a]["3. low"])}),highs:d.map(function(a){return parseFloat(c[a]["2. high"])})}}(b),d=[{label:"Low",data:c.lows},{label:"High",data:c.highs}],e={type:"line",data:{labels:c.labels,datasets:dataDashboard.util.addChartColors(d)},options:{maintainAspectRatio:!1,title:{display:!0,text:[c.title,c.subtitle]}}};a.data().chart=new window.Chart(a.find("canvas"),e)},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://www.alphavantage.co/query",{function:"FX_INTRADAY",from_symbol:"EUR",to_symbol:"USD",interval:"5min",outputsize:"full",apikey:"demo"}).then(function c(b){dataDashboard.util.spinnerStop(a),dataDashboard.widget.finRateIntraday.displayDataChart(a,b)})}},dataDashboard.widget.finRateMovingAvg={displayDataChart:function f(a,b){var c=function e(a){var b=a["Meta Data"],c=a["Technical Analysis: SMA"],d=Object.keys(c).sort();return{title:b["2: Indicator"],subtitle:b["3: Last Refreshed"],set:b["1: Symbol"],labels:d,values:d.map(function(a){return parseFloat(c[a].SMA)})}}(b),d={label:c.set,data:c.values,borderColor:dataDashboard.chartColor.purple,backgroundColor:dataDashboard.chartColor.purple},e={type:"line",data:{labels:c.labels,datasets:[d]},options:{maintainAspectRatio:!1,title:{display:!0,text:[c.title,c.subtitle]}}};a.data().chart=new window.Chart(a.find("canvas"),e)},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://www.alphavantage.co/query",{function:"SMA",symbol:"USDEUR",interval:"weekly",time_period:10,series_type:"open",apikey:"demo"}).then(function c(b){dataDashboard.util.spinnerStop(a),dataDashboard.widget.finRateMovingAvg.displayDataChart(a,b)})}},dataDashboard.widget.geoArea={displayDataChart:function f(a,b){var c="Country: "+b[0].country;b.forEach(function(a){return a.km2=parseInt(a.area.slice(0,-3))}),b.sort(function(a,b){return a.km2-b.km2}),b.splice(0,b.length-15);var d={label:"Square km",data:b.map(function(a){return a.km2}),backgroundColor:dataDashboard.chartColor.orange},e={type:"bar",data:{labels:b.map(function(a){return a.name}),datasets:[d]},options:{maintainAspectRatio:!1,title:{display:!0,text:["Largest 15 States by Geographic Area",c]},scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0}]}}};a.data().chart=new window.Chart(a.find("canvas"),e)},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://cors-anywhere.herokuapp.com/http://services.groupkt.com/state/get/USA/all").then(function c(b){dataDashboard.util.spinnerStop(a),dataDashboard.widget.geoArea.displayDataChart(a,b.RestResponse.result)})}},dataDashboard.widget.networkEndpoints={show:function c(a){var b=dna.getModel(a);b.endpoints=[{name:"Alpha Vantage API",base:"https://www.alphavantage.co/query",docs:"https://www.alphavantage.co/documentation"},{name:"BART API",base:"https://api.bart.gov/api",docs:"https://api.bart.gov/docs/overview/examples.aspx"},{name:"Citi Bike",base:"https://gbfs.citibikenyc.com",docs:"https://www.citibikenyc.com/system-data"},{name:"Ergast Developer API",base:"https://ergast.com/api/f1",docs:"https://ergast.com/mrd/"},{name:"GitHub REST API",base:"https://api.github.com",docs:"https://developer.github.com/v3"},{name:"Google Books APIs",base:"https://www.googleapis.com/books",docs:"https://developers.google.com/books"},{name:"GroupKT Web Services",base:"http://services.groupkt.com ",docs:"http://www.groupkt.com/services/home.htm"},{name:"Flickr API",base:"https://api.flickr.com/services",docs:"https://www.flickr.com/services/feeds/docs/photos_public"},{name:"Stack Exchange API",base:"https://api.stackexchange.com",docs:"https://api.stackexchange.com/docs"},{name:"The Star Wars API",base:"https://swapi.co/api",docs:"https://swapi.co/documentation"}],dna.refresh(a)}},dataDashboard.widget.networkLog={show:function g(a){var b=a.find("figure table"),c=new window.DataTable(b[0],{perPageSelect:[10,25,50,100]}),d=fetchJson.getLogHeaders(),e=dataDashboard.network.getLog().reverse(),f=fetchJson.getLogHeaderIndex().domain;d.splice(f,1),dataDashboard.transformer.dataTablesNormalizer(e,d.length,f),c.insert({headings:d,data:e}),a.data().table=c}},dataDashboard.widget.projectContributors={show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://api.github.com/repos/dnajs/dna.js/contributors").then(function d(b){dataDashboard.util.spinnerStop(a);var c=dna.getModel(a);c.contributors=b,dna.refresh(a)})}},dataDashboard.widget.projectJsonQuestions={displayDataChart:function g(a,b){var c=dataDashboard.util.chartColors.length,d=b.slice(0,c).sort(function(c,a){return a.view_count-c.view_count}),e={backgroundColor:dataDashboard.util.chartColors,data:d.map(function(a){return a.view_count})},f={type:"pie",data:{labels:d.map(function(a){return a.owner.display_name}),datasets:[e]},options:{maintainAspectRatio:!1,title:{display:!0,text:["Active JSON Questions","Page views of "+c+" most recently active JSON questions"]}}};a.data().chart=new window.Chart(a.find("canvas"),f),library.ui.normalize(a)},displayDataTable:function f(a,b){var c=a.find("figure table"),d=new window.DataTable(c[0]);b.forEach(function(a){return a.timestamp=dataDashboard.util.secsToStr(a.last_activity_date)}),b.forEach(function(a){return a.link="<span data-href="+a.link+">"+a.title+"</span>"});var e=b.map(function(a){return[a.timestamp,a.owner.display_name,a.is_answered,a.view_count,a.score||0,a.link]});dataDashboard.transformer.dataTablesNormalizer(e),d.insert({headings:["Last activity","Owner","Answered","Views","Score","Title"],data:e}),a.data().table=d},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://api.stackexchange.com/2.2/search",{order:"desc",sort:"activity",intitle:"json",site:"stackoverflow"}).then(function c(b){dataDashboard.util.spinnerStop(a),dataDashboard.widget.projectJsonQuestions.displayDataChart(a,b.items),dataDashboard.widget.projectJsonQuestions.displayDataTable(a,b.items)})}},dataDashboard.widget.spaceStarships={displayDataChart:function f(a,b){b.forEach(function(a){return a.chart={passengers:parseInt(a.passengers)||0,crew:parseInt(a.crew)||0}}),b.forEach(function(a){return a.chart.total=a.chart.passengers+a.chart.crew}),b.sort(function(a,b){return a.chart.total-b.chart.total});var c=b.slice(-11,-3),d=[{label:"Passengers",data:c.map(function(a){return a.chart.passengers})},{label:"Crew",data:c.map(function(a){return a.chart.crew})}],e={type:"bar",data:{labels:c.map(function(a){return a.name}),datasets:dataDashboard.util.addChartColors(d,4)},options:{maintainAspectRatio:!1,title:{display:!0,text:["Larger Starships","Passengers and crew capacity"]},scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0}]}}};a.data().chart=new window.Chart(a.find("canvas"),e)},displayDataTable:function f(a,b){var c=a.find("figure table"),d=new window.DataTable(c[0]),e=b.map(function(a){return[a.name,a.model,a.length,a.crew,a.passengers,a.MGLT,a.starship_class]});d.insert({headings:["Name","Model","Length","Crew","Passengers","MGLT","Class"],data:e}),a.data().table=d},show:function e(a){var b=[],c=function(){dataDashboard.util.spinnerStop(a),dataDashboard.widget.spaceStarships.displayDataChart(a,b),dataDashboard.widget.spaceStarships.displayDataTable(a,b)},d=function(a){b.push.apply(b,_toConsumableArray(a.results)),a.next?fetchJson.get(a.next).then(d):c()};dataDashboard.util.spinnerStart(a),fetchJson.get("https://swapi.co/api/starships",{format:"json"}).then(d)}},dataDashboard.widget.spaceVehicles={displayDataChart:function f(a,b){b.forEach(function(a){return a.chart={passengers:parseInt(a.passengers)||0,crew:parseInt(a.crew)||0}}),b.forEach(function(a){return a.chart.total=a.chart.passengers+a.chart.crew}),b.sort(function(a,b){return a.chart.total-b.chart.total});var c=b.slice(-12,-4),d=[{label:"Passengers",data:c.map(function(a){return a.chart.passengers})},{label:"Crew",data:c.map(function(a){return a.chart.crew})}],e={type:"bar",data:{labels:c.map(function(a){return a.name}),datasets:dataDashboard.util.addChartColors(d,1)},options:{maintainAspectRatio:!1,title:{display:!0,text:["Larger Vehicles","Passengers and crew capacity"]},scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0}]}}};a.data().chart=new window.Chart(a.find("canvas"),e)},displayDataTable:function f(a,b){var c=a.find("figure table"),d=new window.DataTable(c[0]),e=b.map(function(a){return[a.name,a.model,a.length,a.crew,a.passengers,a.vehicle_class]});d.insert({headings:["Name","Model","Length","Crew","Passengers","Class"],data:e}),a.data().table=d},show:function e(a){var b=[],c=function(){dataDashboard.util.spinnerStop(a),dataDashboard.widget.spaceVehicles.displayDataChart(a,b),dataDashboard.widget.spaceVehicles.displayDataTable(a,b)},d=function(a){b.push.apply(b,_toConsumableArray(a.results)),a.next?fetchJson.get(a.next).then(d):c()};dataDashboard.util.spinnerStart(a),fetchJson.get("https://swapi.co/api/vehicles",{format:"json"}).then(d)}},dataDashboard.widget.spacexBooks={show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://www.googleapis.com/books/v1/volumes",{q:"spacex"}).then(function d(b){dataDashboard.util.spinnerStop(a),b.items=b.items.filter(function(a){return a.volumeInfo.imageLinks});var c=dna.getModel(a);c.books=b.items,dna.refresh(a)})}},dataDashboard.widget.spacexPics={show:function b(a){dataDashboard.util.spinnerStart(a),dataDashboard.util.fetchJsonp("https://api.flickr.com/services/feeds/photos_public.gne",{format:"json",tags:"spacex"},"jsonFlickrFeed",function d(b){dataDashboard.util.spinnerStop(a),b.items.forEach(function(a){return a.date=a.date_taken.substring(0,10)});var c=dna.getModel(a);c.photos=b.items,dna.refresh(a)})}},dataDashboard.widget.transBartDepartures={displayDataChart:function m(a,b){var c=b.station[0].abbr+" -- Upcoming departures from "+b.station[0].name,d=b.date+" "+b.time,e=b.station[0].etd||[];e.forEach(function(a){return a.estimate.forEach(function(b){return b.destination=a.destination})});var f=e.map(function(a){return a.estimate}).reduce(function b(c,a){return c.concat(a)},[]).map(function b(a){return{direction:a.direction,minutes:parseInt(a.minutes)||0,label:"Platform #"+a.platform+" to "+a.destination}}).sort(function b(c,a){return c.minutes-a.minutes}),g=f.map(function(a){return a.direction}).filter(function d(a,b,c){return c.indexOf(a)===b}),h=g.map(function(a){return f.filter(function(b){return b.direction===a})}),i=function(a,b,c){return a.delta=c[b].minutes-(b?c[b-1].minutes:0)+1};h.forEach(function(a){return a.forEach(i)});var j=Math.max.apply(Math,_toConsumableArray(h.map(function(a){return a.length})));h.forEach(function b(a){for(;a.length<j;)a.push({delta:0})});var k=[null];for(k.pop();k.length<j;)k.push({label:"Train "+(k.length+1),labels:h.map(function(a){return a[k.length].label}),data:h.map(function(a){return a[k.length].delta})});var l={type:"horizontalBar",data:{labels:g,datasets:dataDashboard.util.addChartColors(k)},options:{maintainAspectRatio:!1,title:{display:!0,text:[c,d]},scales:{xAxes:[{stacked:!0,scaleLabel:{display:!0,labelString:"Estimated minutes until departure"}}],yAxes:[{stacked:!0,scaleLabel:{display:!0,labelString:"Direction"}}]},tooltips:{callbacks:{label:function c(a,b){return b.datasets[a.datasetIndex].labels[a.index]}}}}};a.data().chart=new window.Chart(a.find("canvas"),l)},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://api.bart.gov/api/etd.aspx",{cmd:"etd",orig:"embr",key:"MW9S-E7SL-26DU-VV8V",json:"y"}).then(function c(b){dataDashboard.util.spinnerStop(a),dataDashboard.widget.transBartDepartures.displayDataChart(a,b.root)})}},dataDashboard.widget.transBartStations={displayDataChart:function d(a,b){var c={label:"Geolocation",backgroundColor:dataDashboard.chartColor.green,data:b.map(function(a){return{x:parseFloat(a.gtfs_longitude),y:parseFloat(a.gtfs_latitude),label:a.abbr+" ("+a.name+")"}})};a.data().chart=new window.Chart(a.find("canvas"),{type:"scatter",data:{datasets:[c]},options:{maintainAspectRatio:!1,title:{display:!0,text:["BART Stations","San Francisco Bay Area"]},tooltips:{callbacks:{label:function c(a,b){return b.datasets[a.datasetIndex].data[a.index].label}}}}})},displayDataTable:function f(a,b){var c=a.find("figure table"),d=new window.DataTable(c[0]),e=b.map(function(a){return[a.name,a.abbr,a.gtfs_latitude,a.gtfs_longitude,a.city,a.county]});d.insert({headings:["Name","Code","Latitude","Longitude","City","County"],data:e}),a.data().table=d},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://api.bart.gov/api/stn.aspx",{cmd:"stns",key:"MW9S-E7SL-26DU-VV8V",json:"y"}).then(function d(b){dataDashboard.util.spinnerStop(a);var c=b.root.stations.station;dataDashboard.widget.transBartStations.displayDataChart(a,c),dataDashboard.widget.transBartStations.displayDataTable(a,c)})}},dataDashboard.widget.transF1TopCountries={displayDataChart:function j(a,b){var c=b.season+" "+b.raceName+" top "+10+" finishes",d=parseInt(b.round),e=b.Results.slice(0,10).reduce(function c(a,b){return[b.Driver.nationality,b.Constructor.nationality].forEach(function c(b){a[b]||(a[b]={nationality:b,numDrivers:0,numConstructors:0})}),a[b.Driver.nationality].numDrivers++,a[b.Constructor.nationality].numConstructors++,a},{}),f=Object.keys(e).map(function(a){return e[a]});f.sort(function(c,a){return c.numDrivers+c.numConstructors-a.numDrivers-a.numConstructors||c.nationality.localeCompare(a.nationality)});var g=[{label:"Driver",data:f.map(function(a){return a.numDrivers})},{label:"Constructor",data:f.map(function(a){return a.numConstructors})}],h={type:"bar",data:{labels:f.map(function(a){return a.nationality}),datasets:dataDashboard.util.addChartColors(g)},options:{maintainAspectRatio:!1,title:{display:!0,text:["Nationalities of Top F1 Drivers and Constructors",c]},scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0}]}}},i=a.find("canvas").eq(d-1);a.data().chart=new window.Chart(i,h)},show:function e(a){var b=new Date().getFullYear()-1,c=function(b){dataDashboard.util.spinnerStop(a);var c=b.MRData.RaceTable.Races[0];dataDashboard.widget.transF1TopCountries.displayDataChart(a,c)};dataDashboard.util.spinnerStart(a);var d=function(a){fetchJson.get("https://ergast.com/api/f1/"+b+"/"+a+"/results.json").then(c)};a.find("widget-body >figure >canvas").each(function(a){return d(a+1)})}},dataDashboard.widget.transNycBikeStations={displayDataChart:function g(a,b){var c="Capacity on "+new Date(1e3*b.last_updated).toLocaleString(),d=b.data.stations;d.forEach(function(a){return a.capacity=a.num_docks_available+a.num_bikes_available+a.num_bikes_disabled}),d.sort(function(c,a){return c.capacity-a.capacity}),d.forEach(function(a){return a.reservedBikes=a.totalDocks-a.availableDocks-a.availableBikes});var e=[{label:"Available docks",data:d.map(function(a){return a.num_docks_available})},{label:"Available bikes",data:d.map(function(a){return a.num_bikes_available})},{label:"Disabled bikes",data:d.map(function(a){return a.num_bikes_disabled})}],f={type:"bar",data:{labels:Array.from({length:d.length},function(a,b){return b+1}),datasets:dataDashboard.util.addChartColors(e,3)},options:{maintainAspectRatio:!1,title:{display:!0,text:["NYC Bike Stations",c]},scales:{xAxes:[{stacked:!0}],yAxes:[{stacked:!0}]}}};dataDashboard.util.narrowScreenSaver(f),a.data().chart=new window.Chart(a.find("canvas"),f)},show:function b(a){dataDashboard.util.spinnerStart(a),fetchJson.get("https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then(function c(b){dataDashboard.util.spinnerStop(a),dataDashboard.widget.transNycBikeStations.displayDataChart(a,b)})}};
