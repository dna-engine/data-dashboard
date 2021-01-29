//! data-dashboard v0.1.3 ~~ https://data-dashboard.js.org ~~ MIT License
function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(a,b){if(a){if("string"==typeof a)return _arrayLikeToArray(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);return"Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c?Array.from(a):"Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c)?_arrayLikeToArray(a,b):void 0}}function _iterableToArray(a){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}function _typeof(a){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},_typeof(a)}function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(Object(b),!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}var appConfig={widgets:[{code:"fin-rate-intraday",header:"Exchange rate intraday"},{code:"fin-rate-moving-avg",header:"Exchange rate moving average"},{code:"network-endpoints",header:"REST endpoints"},{code:"network-log",header:"Network log"},{code:"network-rest-tool",header:"REST tool"},{code:"project-contributors",header:"dna.js contributors"},{code:"project-json-questions",header:"JSON questions"},{code:"space-starships",header:"Starship data"},{code:"space-vehicles",header:"Vehicle data"},{code:"spacex-books",header:"SpaceX books"},{code:"spacex-pics",header:"SpaceX pictures"},{code:"trans-bart-departures",header:"BART departures"},{code:"trans-bart-stations",header:"BART stations"},{code:"trans-f1-top-countries",header:"F1 top countries"},{code:"trans-nyc-bike-stations",header:"NYC bike stations"}],panels:[{code:"finance",header:"Finance",display:!0,widgets:["fin-rate-moving-avg","fin-rate-intraday"]},{code:"space",header:"Space",display:!0,widgets:["spacex-books","spacex-pics"]},{code:"starships",header:"Starships",display:!0,widgets:["space-starships","space-vehicles"]},{code:"trans",header:"Transportation",display:!0,widgets:["trans-nyc-bike-stations","trans-bart-stations","trans-bart-departures","trans-f1-top-countries"]},{code:"project",header:"Project",display:!0,widgets:["project-contributors","project-json-questions"]},{code:"tbd",header:"TBD",display:!1,widgets:["wip-widget"]},{code:"network",header:"Network",display:!0,widgets:["network-log","network-endpoints","network-rest-tool"]}],chartColors:[{code:"red",value:"rgba(255,  99, 132, 0.7)"},{code:"blue",value:"rgba( 54, 162, 235, 0.7)"},{code:"yellow",value:"rgba(255, 206,  86, 0.7)"},{code:"green",value:"rgba( 75, 192, 192, 0.7)"},{code:"purple",value:"rgba(153, 102, 255, 0.7)"},{code:"orange",value:"rgba(255, 159,  64, 0.7)"},{code:"teal",value:"rgba(  0, 200, 230, 0.7)"}]},appController={showPanel:function showPanel(a){window.scrollTo({top:0});return a.find(">app-widgets").children().toArray().forEach(function showWidget(b,c){var d=$(b),e=dna.getModel(d),f={missingWidget:"DataDashboard - Missing widget, index: %s, panel: %s",missingController:"DataDashboard - Widget controller missing: %s"};if(!e)throw Error(dna.util.printf(f.missingWidget,c,a.data().hash));d.find(">app-widget-body").remove(),d.append(dna.clone(e.code,{}));var g=app.widget[dna.util.toCamel(e.code)];if(!g)throw Error(dna.util.printf(f.missingController,e.code));g.show(d)}),a},jsdomWorkarounds:function jsdomWorkarounds(){fetchJson.enableLogger();window.Chart=function a(){_classCallCheck(this,a)};window.scrollTo=function stubFn(){}},setup:function setup(){libX.ui.autoDisableButtons(),dna.registerInitializer(libX.bubbleHelp.setup),fetchJson.enableLogger(app.network.logEvent),navigator.userAgent.includes("jsdom")&&app.controller.jsdomWorkarounds(),app.lookup.panels.forEach(function(a){return a.widgetList=a.widgets.map(function(a){return app.lookup.widget[a]})});var a=app.lookup.panels.filter(function(a){return a.display});$(function onLoadSetup(){dna.clone("app-menu-item",a),dna.clone("app-panel",a)})}},appUtil={lookupChartColor:function lookupChartColor(a){return app.lookup.chartColors[a%app.lookup.chartColors.length].value},addChartColors:function addChartColors(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:0;return a.forEach(function colorize(a,c){a.fill=!1,a.borderColor=app.util.lookupChartColor(b+c),a.backgroundColor=app.util.lookupChartColor(b+c)}),a},narrowScreenSaver:function narrowScreenSaver(a,b){var c=_objectSpread(_objectSpread({},{maxPoints:200,screenWidth:700}),b),d=Math.ceil(a.data.labels.length/c.maxPoints);return 1<d&&$(document.body).width()<c.screenWidth&&function shrinkNow(){var b=function(a){return a.filter(function(a,b){return 0==b%d})};a.data.labels=b(a.data.labels),a.data.datasets.forEach(function(a){return a.data=b(a.data)})}(),a},secsToStr:function secsToStr(a){return new Date(1e3*a).toISOString().replace("T"," ").substring(0,19)},spinnerStart:function spinnerStart(a){a=a.closest("app-widget");var b=function(){return $("<app-widget-spinner><i data-icon=yin-yang class=fa-spin>").css({paddingTop:a.height()/2-50})},c=function(){return libX.ui.makeIcons(b()).appendTo(a)},d=a.addClass("waiting").find(">app-widget-spinner"),e=d.length?d:c();return e.hide().fadeIn().parent()},spinnerStop:function spinnerStop(a){var b=a.closest("app-widget").removeClass("waiting");return b.find(">app-widget-spinner").fadeOut(1500),b},fetchJsonp:function fetchJsonp(a,b,c,d){var e=new URL(a);b&&Object.entries(b).forEach(function addParam(a){return e.searchParams.append(a[0],a[1]+"")});var f={url:e.href,dataType:"jsonp",jsonpCallback:c};return $.ajax(f).done(d)}},appNetwork={logName:"network-log",logEvent:function logEvent(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];console.log(b.join(" - "));var d=app.network.getLog();for(d.push(b);d.length>250;)d.shift();localStorage.setItem(app.network.logName,JSON.stringify(d))},getLog:function getLog(){return JSON.parse(localStorage.getItem(app.network.logName))||[]}},appTransformer={dataTablesNormalizer:function dataTablesNormalizer(a,b,c){var d=b?b:a.length?a[0].length:0;return a.forEach(function normalize(a){var b=function(b,c){var d=_typeof(b);"string"!==d&&(a[c]=["boolean","number"].includes(d)?b+"":"")};for(a.forEach(b),void 0!==c&&a.splice(c,1);a.length<d;)a.push("");for(;a.length>d;)a.pop()}),a}},appWidgetFinRateIntraday={displayDataChart:function displayDataChart(a,b){var c=function transform(a){var b=a["Meta Data"],c=a["Time Series FX (5min)"],d=Object.keys(c).sort(),e=b["2. From Symbol"]+"/"+b["3. To Symbol"];return{title:b["1. Information"],subtitle:e+" "+b["4. Last Refreshed"],labels:d.map(function(a){return a.substring(11,16)}),lows:d.map(function(a){return parseFloat(c[a]["3. low"])}),highs:d.map(function(a){return parseFloat(c[a]["2. high"])})}}(b),d=[{label:"Low",data:c.lows},{label:"High",data:c.highs}],e={type:"line",data:{labels:c.labels,datasets:app.util.addChartColors(d)},options:{maintainAspectRatio:!1,title:{display:!0,text:[c.title,c.subtitle]}}},f=a.find("canvas");a.data().chart=new Chart(f,e)},show:function show(a){var b="https://www.alphavantage.co/query";app.util.spinnerStart(a),fetchJson.get(b,{function:"FX_INTRADAY",from_symbol:"EUR",to_symbol:"USD",interval:"5min",outputsize:"full",apikey:"demo"}).then(function handleData(c){app.util.spinnerStop(a),!c||c["Error Message"]?console.error(b,c):app.widget.finRateIntraday.displayDataChart(a,c)})}},appWidgetFinRateMovingAvg={displayDataChart:function displayDataChart(a,b){var c=function transform(a){var b=a["Meta Data"],c=a["Technical Analysis: SMA"],d=Object.keys(c).sort();return{title:b["2: Indicator"],subtitle:b["3: Last Refreshed"],set:b["1: Symbol"],labels:d,values:d.map(function(a){return parseFloat(c[a].SMA)})}}(b),d={label:c.set,data:c.values,borderColor:app.lookup.chartColor.purple.value,backgroundColor:app.lookup.chartColor.purple.value},e={type:"line",data:{labels:c.labels,datasets:[d]},options:{maintainAspectRatio:!1,title:{display:!0,text:[c.title,c.subtitle]}}},f=a.find("canvas");a.data().chart=new Chart(f,e)},show:function show(a){app.util.spinnerStart(a),fetchJson.get("https://www.alphavantage.co/query",{function:"SMA",symbol:"USDEUR",interval:"weekly",time_period:10,series_type:"open",apikey:"demo"}).then(function handleData(b){app.util.spinnerStop(a),b["Error Message"]||app.widget.finRateMovingAvg.displayDataChart(a,b)})}},appWidgetNetworkEndpoints={show:function show(a){var b=dna.getModel(a);return b.endpoints=[{name:"Alpha Vantage API",base:"https://www.alphavantage.co/query",docs:"https://www.alphavantage.co/documentation"},{name:"BART API",base:"https://api.bart.gov/api",docs:"https://api.bart.gov/docs/overview/examples.aspx"},{name:"Citi Bike",base:"https://gbfs.citibikenyc.com",docs:"https://www.citibikenyc.com/system-data"},{name:"Ergast Developer API",base:"https://ergast.com/api/f1",docs:"https://ergast.com/mrd/"},{name:"GitHub REST API",base:"https://api.github.com",docs:"https://developer.github.com/v3"},{name:"Google Books APIs",base:"https://www.googleapis.com/books",docs:"https://developers.google.com/books"},{name:"Flickr API",base:"https://api.flickr.com/services",docs:"https://www.flickr.com/services/feeds/docs/photos_public"},{name:"Stack Exchange API",base:"https://api.stackexchange.com",docs:"https://api.stackexchange.com/docs"},{name:"The Star Wars API",base:"https://swapi.py4e.com/api",docs:"https://swapi.py4e.com/documentation"}],dna.refresh(a)}},appWidgetNetworkLog={show:function show(a){var b=a.find("figure table"),c=globalThis.simpleDatatables.DataTable,d=new c(b[0],{perPageSelect:[10,25,50,100]}),e=fetchJson.getLogHeaders(),f=app.network.getLog().reverse(),g=fetchJson.getLogHeaderIndex().domain;e.splice(g,1),app.transformer.dataTablesNormalizer(f,e.length,g),d.insert({headings:e,data:f}),a.data().table=d}},appWidgetNetworkRestTool={elem:null,get:function get(a){var b=app.widget.networkRestTool.elem,c=dna.getModel(b.widget),d=function(d){c.restError=!!d.error,c.jsonHtml=prettyPrintJson.toHtml(d),dna.refresh(b.widget,{html:!0}),app.util.spinnerStop(b.widget),b.button.enable(),a&&b.input.trigger("focus")};app.util.spinnerStart(b.widget),c.url=b.input.val(),fetchJson.get(c.url).then(d)["catch"](function handleError(a){return d({error:!0,name:a.name,message:a.message})})},show:function show(a){var b={widget:a,input:a.find("input"),button:a.find("button")};app.widget.networkRestTool.elem=b,b.input.val("https://dnajs.org/rest/book/1/"),app.widget.networkRestTool.get()}},appWidgetProjectContributors={show:function show(a){app.util.spinnerStart(a),fetchJson.get("https://api.github.com/repos/dnajs/dna.js/contributors").then(function handleData(b){app.util.spinnerStop(a);var c=dna.getModel(a);c.contributors=b,dna.refresh(a)})}},appWidgetProjectJsonQuestions={displayDataChart:function displayDataChart(a,b){var c=app.lookup.chartColors.length,d=b.slice(0,c).sort(function(c,a){return a.view_count-c.view_count}),e={backgroundColor:app.lookup.chartColors.map(function(a){return a.value}),data:d.map(function(a){return a.view_count})},f={type:"pie",data:{labels:d.map(function(a){return a.owner.display_name}),datasets:[e]},options:{maintainAspectRatio:!1,title:{display:!0,text:["Active JSON Questions","Page views of "+c+" most recently active JSON questions"]}}},g=a.find("canvas");a.data().chart=new Chart(g,f),libX.ui.normalize(a)},displayDataTable:function displayDataTable(a,b){var c=a.find("figure table"),d=globalThis.simpleDatatables.DataTable,e=new d(c[0]);b.forEach(function(a){return a.timestamp=app.util.secsToStr(a.last_activity_date)}),b.forEach(function(a){return a.link="<span data-href="+a.link+">"+a.title+"</span>"});var f=b.map(function(a){return[a.timestamp,a.owner.display_name,a.is_answered,a.view_count,a.score||0,a.link]});app.transformer.dataTablesNormalizer(f),e.insert({headings:["Last activity","Owner","Answered","Views","Score","Title"],data:f}),a.data().table=e},show:function show(a){app.util.spinnerStart(a),fetchJson.get("https://api.stackexchange.com/2.2/search",{order:"desc",sort:"activity",intitle:"json",site:"stackoverflow"}).then(function handleData(b){app.util.spinnerStop(a),app.widget.projectJsonQuestions.displayDataChart(a,b.items),app.widget.projectJsonQuestions.displayDataTable(a,b.items)})}},appWidgetSpaceStarships={displayDataChart:function displayDataChart(a,b){b.forEach(function(a){return a.chart={passengers:parseInt(a.passengers)||0,crew:parseInt(a.crew)||0}}),b.forEach(function(a){return a.chart.total=a.chart.passengers+a.chart.crew}),b.sort(function(a,b){return a.chart.total-b.chart.total});var c=b.slice(-11,-3),d=[{label:"Passengers",data:c.map(function(a){return a.chart.passengers})},{label:"Crew",data:c.map(function(a){return a.chart.crew})}],e={type:"bar",data:{labels:c.map(function(a){return a.name}),datasets:app.util.addChartColors(d,4)},options:{maintainAspectRatio:!1,title:{display:!0,text:["Larger Starships","Passengers and crew capacity"]},scales:{x:{stacked:!0},y:{stacked:!0}}}},f=a.find("canvas");a.data().chart=new Chart(f,e)},displayDataTable:function displayDataTable(a,b){var c=a.find("figure table"),d=globalThis.simpleDatatables.DataTable,e=new d(c[0]),f=b.map(function(a){return[a.name,a.model,a.length,a.crew,a.passengers,a.MGLT,a.starship_class]});e.insert({headings:["Name","Model","Length","Crew","Passengers","MGLT","Class"],data:f}),a.data().table=e},show:function show(a){var b=[],c=function(){app.util.spinnerStop(a),app.widget.spaceStarships.displayDataChart(a,b),app.widget.spaceStarships.displayDataTable(a,b)},d=function(a){b.push.apply(b,_toConsumableArray(a.results)),a.next?fetchJson.get(a.next.replace("http://","https://")).then(d):c()};app.util.spinnerStart(a),fetchJson.get("https://swapi.py4e.com/api/starships/",{format:"json"}).then(d)}},appWidgetSpaceVehicles={displayDataChart:function displayDataChart(a,b){b.forEach(function(a){return a.chart={passengers:parseInt(a.passengers)||0,crew:parseInt(a.crew)||0}}),b.forEach(function(a){return a.chart.total=a.chart.passengers+a.chart.crew}),b.sort(function(a,b){return a.chart.total-b.chart.total});var c=b.slice(-12,-4),d=[{label:"Passengers",data:c.map(function(a){return a.chart.passengers})},{label:"Crew",data:c.map(function(a){return a.chart.crew})}],e={type:"bar",data:{labels:c.map(function(a){return a.name}),datasets:app.util.addChartColors(d,1)},options:{maintainAspectRatio:!1,title:{display:!0,text:["Larger Vehicles","Passengers and crew capacity"]},scales:{x:{stacked:!0},y:{stacked:!0}}}},f=a.find("canvas");a.data().chart=new Chart(f,e)},displayDataTable:function displayDataTable(a,b){var c=a.find("figure table"),d=globalThis.simpleDatatables.DataTable,e=new d(c[0]),f=b.map(function(a){return[a.name,a.model,a.length,a.crew,a.passengers,a.vehicle_class]});e.insert({headings:["Name","Model","Length","Crew","Passengers","Class"],data:f}),a.data().table=e},show:function show(a){var b=[],c=function(){app.util.spinnerStop(a),app.widget.spaceVehicles.displayDataChart(a,b),app.widget.spaceVehicles.displayDataTable(a,b)},d=function(a){b.push.apply(b,_toConsumableArray(a.results)),a.next?fetchJson.get(a.next.replace("http://","https://")).then(d):c()};app.util.spinnerStart(a),fetchJson.get("https://swapi.py4e.com/api/vehicles/",{format:"json"}).then(d)}},appWidgetSpacexBooks={show:function show(a){app.util.spinnerStart(a),fetchJson.get("https://www.googleapis.com/books/v1/volumes",{q:"spacex"}).then(function handleData(b){app.util.spinnerStop(a),b.items=b.items.filter(function(a){return a.volumeInfo.imageLinks});var c=dna.getModel(a);c.books=b.items,dna.refresh(a)})}},appWidgetSpacexPics={show:function show(a){app.util.spinnerStart(a),app.util.fetchJsonp("https://api.flickr.com/services/feeds/photos_public.gne",{format:"json",tags:"spacex"},"jsonFlickrFeed",function handleData(b){app.util.spinnerStop(a),b.items.forEach(function(a){return a.date=a.date_taken.substring(0,10)});var c=dna.getModel(a);c.photos=b.items,dna.refresh(a)})}},appWidgetTransBartDepartures={displayDataChart:function displayDataChart(a,b,c){var d=c.abbr+" -- Upcoming departures from "+c.name,e=c.etd||[];e.forEach(function(a){return a.estimate.forEach(function(b){return b.destination=a.destination})});var f=e.map(function(a){return a.estimate}).reduce(function(c,a){return c.concat(a)},[]).map(function toChartData(a){return{direction:a.direction,minutes:parseInt(a.minutes)||0,label:"Platform #"+a.platform+" to "+a.destination}}).sort(function compareMinutes(c,a){return c.minutes-a.minutes}),g=f.map(function(a){return a.direction}).filter(function onlyUnique(a,b,c){return c.indexOf(a)===b}),h=g.map(function(a){return f.filter(function(b){return b.direction===a})}),i=function(a,b,c){return a.delta=c[b].minutes-(b?c[b-1].minutes:0)+1};h.forEach(function(a){return a.forEach(i)});var j=Math.max.apply(Math,_toConsumableArray(h.map(function(a){return a.length})));h.forEach(function padEstimates(a){for(;a.length<j;)a.push({direction:"",minutes:0,label:"",delta:0})});for(var m=[];m.length<j;)m.push({label:"Train "+(m.length+1),labels:h.map(function(a){return a[m.length].label}),data:h.map(function(a){return a[m.length].delta})});var k={type:"bar",data:{labels:g,datasets:app.util.addChartColors(datasets)},options:{indexAxis:"y",maintainAspectRatio:!1,title:{display:!0,text:[d,b]},scales:{x:{stacked:!0,scaleLabel:{display:!0,labelString:"Estimated minutes until departure"}},y:{stacked:!0,scaleLabel:{display:!0,labelString:"Direction"}}},tooltips:{callbacks:{label:function makeTooltip(a){return a.dataset.label+": "+a.dataset.labels[a.dataIndex]}}}}},l=a.find("canvas");a.data().chart=new Chart(l,k)},show:function show(a){var b="https://api.bart.gov/api/etd.aspx";app.util.spinnerStart(a),fetchJson.get(b,{cmd:"etd",orig:"embr",key:"MW9S-E7SL-26DU-VV8V",json:"y"}).then(function handleData(c){var d,e;app.util.spinnerStop(a);var f=c.root.date+" "+c.root.time,g=c.root.station[0];null!==(d=g.message)&&void 0!==d&&d.error&&console.log(b,null===(e=g.message)||void 0===e?void 0:e.error),app.widget.transBartDepartures.displayDataChart(a,f,g)})}},appWidgetTransBartStations={displayDataChart:function displayDataChart(a,b){var c={label:"Geolocation",backgroundColor:app.lookup.chartColor.green.value,data:b.map(function(a){return{x:parseFloat(a.gtfs_longitude),y:parseFloat(a.gtfs_latitude),label:a.abbr+" ("+a.name+")"}})},d=function(a){var b=parseFloat(a.formattedValue),c=parseFloat(a.label);return"".concat(Math.abs(b),"\xB0").concat(0<b?"N":"S"," ").concat(Math.abs(c),"\xB0").concat(0<c?"E":"W")},e=a.find("canvas");a.data().chart=new Chart(e,{type:"scatter",data:{datasets:[c]},options:{maintainAspectRatio:!1,title:{display:!0,text:["BART Stations","San Francisco Bay Area"]},tooltips:{callbacks:{label:function makeTooltip(a){return a.dataset.data[a.dataIndex].label+" "+d(a)}}}}})},displayDataTable:function displayDataTable(a,b){var c=a.find("figure table"),d=globalThis.simpleDatatables.DataTable,e=new d(c[0]),f=b.map(function(a){return[a.name,a.abbr,a.gtfs_latitude,a.gtfs_longitude,a.city,a.county]});e.insert({headings:["Name","Code","Latitude","Longitude","City","County"],data:f}),a.data().table=e},show:function show(a){app.util.spinnerStart(a),fetchJson.get("https://api.bart.gov/api/stn.aspx",{cmd:"stns",key:"MW9S-E7SL-26DU-VV8V",json:"y"}).then(function handleData(b){app.util.spinnerStop(a);var c=b.root.stations.station;app.widget.transBartStations.displayDataChart(a,c),app.widget.transBartStations.displayDataTable(a,c)})}},appWidgetTransF1TopCountries={displayDataChart:function displayDataChart(a,b){var c=b.season+" "+b.raceName+" top "+10+" finishes",d=+b.round,e=b.Results.slice(0,10).reduce(function addResult(a,b){return[b.Driver.nationality,b.Constructor.nationality].forEach(function setupNationality(b){a[b]||(a[b]={nationality:b,numDrivers:0,numConstructors:0})}),a[b.Driver.nationality].numDrivers++,a[b.Constructor.nationality].numConstructors++,a},{}),f=Object.keys(e).map(function(a){return e[a]});f.sort(function(c,a){return c.numDrivers+c.numConstructors-a.numDrivers-a.numConstructors||c.nationality.localeCompare(a.nationality)});var g=[{label:"Driver",data:f.map(function(a){return a.numDrivers})},{label:"Constructor",data:f.map(function(a){return a.numConstructors})}],h={type:"bar",data:{labels:f.map(function(a){return a.nationality}),datasets:app.util.addChartColors(g)},options:{maintainAspectRatio:!1,title:{display:!0,text:["Nationalities of Top F1 Drivers and Constructors",c]},scales:{x:{stacked:!0},y:{stacked:!0}}}},i=a.find("canvas").eq(d-1);a.data().chart=new Chart(i,h)},show:function show(a){var b=new Date().getFullYear()-1,c=function(b){app.util.spinnerStop(a);var c=b.MRData.RaceTable.Races[0];app.widget.transF1TopCountries.displayDataChart(a,c)};app.util.spinnerStart(a);var d=function(a){fetchJson.get("https://ergast.com/api/f1/"+b+"/"+a+"/results.json").then(c)};a.find("app-widget-body >figure >canvas").each(function(a){return d(a+1)})}},appWidgetTransNycBikeStations={displayDataChart:function displayDataChart(a,b){var c="Capacity on "+new Date(1e3*b.last_updated).toLocaleString(),d=b.data.stations;d.forEach(function(a){return a.capacity=a.num_docks_available+a.num_bikes_available+a.num_bikes_disabled}),d.sort(function(c,a){return c.capacity-a.capacity}),d.forEach(function(a){return a.reservedBikes=a.totalDocks-a.availableDocks-a.availableBikes});var e=[{label:"Available docks",data:d.map(function(a){return a.num_docks_available})},{label:"Available bikes",data:d.map(function(a){return a.num_bikes_available})},{label:"Disabled bikes",data:d.map(function(a){return a.num_bikes_disabled})}],f={type:"bar",data:{labels:Array.from({length:d.length},function(a,b){return b+1}),datasets:app.util.addChartColors(e,3)},options:{maintainAspectRatio:!1,title:{display:!0,text:["NYC Bike Stations",c]},scales:{x:{stacked:!0},y:{stacked:!0}}}};app.util.narrowScreenSaver(f);var g=a.find("canvas");a.data().chart=new Chart(g,f)},show:function show(a){app.util.spinnerStart(a),fetchJson.get("https://gbfs.citibikenyc.com/gbfs/en/station_status.json").then(function handleData(b){app.util.spinnerStop(a),app.widget.transNycBikeStations.displayDataChart(a,b)})}},app={config:appConfig,controller:appController,util:appUtil,network:appNetwork,transformer:appTransformer,lookup:{widgets:appConfig.widgets,panels:appConfig.panels,chartColors:appConfig.chartColors,widget:dna.array.toMap(appConfig.widgets),panel:dna.array.toMap(appConfig.panels),chartColor:dna.array.toMap(appConfig.chartColors)},widget:{finRateIntraday:appWidgetFinRateIntraday,finRateMovingAvg:appWidgetFinRateMovingAvg,networkEndpoints:appWidgetNetworkEndpoints,networkLog:appWidgetNetworkLog,networkRestTool:appWidgetNetworkRestTool,projectContributors:appWidgetProjectContributors,projectJsonQuestions:appWidgetProjectJsonQuestions,spaceStarships:appWidgetSpaceStarships,spaceVehicles:appWidgetSpaceVehicles,spacexBooks:appWidgetSpacexBooks,spacexPics:appWidgetSpacexPics,transBartDepartures:appWidgetTransBartDepartures,transBartStations:appWidgetTransBartStations,transF1TopCountries:appWidgetTransF1TopCountries,transNycBikeStations:appWidgetTransNycBikeStations}};app.controller.setup();
