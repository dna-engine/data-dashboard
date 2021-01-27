// DataDashboard
// Configuration

// Imports
import { dna } from 'dna.js';
import { appController } from './controller.js';
import { appNetwork, appTransformer, appUtil } from './util.js';

// Widgets
import { appWidgetFinRateIntraday } from '../widgets/fin-rate-intraday/fin-rate-intraday.js';
import { appWidgetFinRateMovingAvg } from '../widgets/fin-rate-moving-avg/fin-rate-moving-avg.js';
import { appWidgetNetworkEndpoints } from '../widgets/network-endpoints/network-endpoints.js';
import { appWidgetNetworkLog } from '../widgets/network-log/network-log.js';
import { appWidgetNetworkRestTool } from '../widgets/network-rest-tool/network-rest-tool.js';
import { appWidgetProjectContributors } from '../widgets/project-contributors/project-contributors.js';
import { appWidgetProjectJsonQuestions } from '../widgets/project-json-questions/project-json-questions.js';
import { appWidgetSpaceStarships } from '../widgets/space-starships/space-starships.js';
import { appWidgetSpaceVehicles } from '../widgets/space-vehicles/space-vehicles.js';
import { appWidgetSpacexBooks } from '../widgets/spacex-books/spacex-books.js';
import { appWidgetSpacexPics } from '../widgets/spacex-pics/spacex-pics.js';
import { appWidgetTransBartDepartures } from '../widgets/trans-bart-departures/trans-bart-departures.js';
import { appWidgetTransBartStations } from '../widgets/trans-bart-stations/trans-bart-stations.js';
import { appWidgetTransF1TopCountries } from '../widgets/trans-f1-top-countries/trans-f1-top-countries.js';
import { appWidgetTransNycBikeStations } from '../widgets/trans-nyc-bike-stations/trans-nyc-bike-stations.js';

export type AppOptionsNarrowScreenSaver = Partial<{
   maxPoints:   number,
   screenWidth: number,
   }>;

export type AppWidget =        typeof appConfig.widgets[0];
export type AppPanel =         (typeof appConfig.panels[0]) & { widgetList?: AppWidget[] };
export type AppChartColor =    typeof appConfig.chartColors[0];
export type AppWidgetMap =     { [code: string]: AppWidget };
export type AppPanelMap =      { [code: string]: AppPanel };
export type AppChartColorMap = { [code: string]: AppChartColor };

export type AppParamValue =    string | number | boolean | null;
export type AppParams =        { [param: string]: AppParamValue };
export type AppDataObject =    Record<string, unknown>;
export type AppCallback =      (...args: unknown[]) => unknown;

const appConfig = {
   widgets: [
      { code: 'fin-rate-intraday',       header: 'Exchange rate intraday' },
      { code: 'fin-rate-moving-avg',     header: 'Exchange rate moving average' },
      { code: 'network-endpoints',       header: 'REST endpoints' },
      { code: 'network-log',             header: 'Network log' },
      { code: 'network-rest-tool',       header: 'REST tool' },
      { code: 'project-contributors',    header: 'dna.js contributors' },
      { code: 'project-json-questions',  header: 'JSON questions' },
      { code: 'space-starships',         header: 'Starship data' },
      { code: 'space-vehicles',          header: 'Vehicle data' },
      { code: 'spacex-books',            header: 'SpaceX books' },
      { code: 'spacex-pics',             header: 'SpaceX pictures' },
      { code: 'trans-bart-departures',   header: 'BART departures' },
      { code: 'trans-bart-stations',     header: 'BART stations' },
      { code: 'trans-f1-top-countries',  header: 'F1 top countries'},
      { code: 'trans-nyc-bike-stations', header: 'NYC bike stations' },
      ],
   panels: [
      { code: 'finance',   header: 'Finance',        display: true,  widgets: ['fin-rate-moving-avg', 'fin-rate-intraday'] },
      { code: 'space',     header: 'Space',          display: true,  widgets: ['spacex-books', 'spacex-pics'] },
      { code: 'starships', header: 'Starships',      display: true,  widgets: ['space-starships', 'space-vehicles'] },
      { code: 'trans',     header: 'Transportation', display: true,  widgets: ['trans-nyc-bike-stations', 'trans-bart-stations', 'trans-bart-departures', 'trans-f1-top-countries'] },
      { code: 'project',   header: 'Project',        display: true,  widgets: ['project-contributors', 'project-json-questions'] },
      { code: 'tbd',       header: 'TBD',            display: false, widgets: ['wip-widget'] },
      { code: 'network',   header: 'Network',        display: true,  widgets: ['network-log', 'network-endpoints', 'network-rest-tool'] },
      ],
   chartColors: [
      { code: 'red',    value: 'rgba(255,  99, 132, 0.7)' },
      { code: 'blue',   value: 'rgba( 54, 162, 235, 0.7)' },
      { code: 'yellow', value: 'rgba(255, 206,  86, 0.7)' },
      { code: 'green',  value: 'rgba( 75, 192, 192, 0.7)' },
      { code: 'purple', value: 'rgba(153, 102, 255, 0.7)' },
      { code: 'orange', value: 'rgba(255, 159,  64, 0.7)' },
      { code: 'teal',   value: 'rgba(  0, 200, 230, 0.7)' },
      ],
   };

const app = {
   cfg: {
      widgets:     appConfig.widgets,
      panels:      <AppPanel[]>appConfig.panels,
      chartColors: appConfig.chartColors,
      widget:      <AppWidgetMap>dna.array.toMap(appConfig.widgets),
      panel:       <AppPanelMap>dna.array.toMap(appConfig.panels),
      chartColor:  <AppChartColorMap>dna.array.toMap(appConfig.chartColors),
      },
   controller: appController,
   util: appUtil,
   network: appNetwork,
   transformer: appTransformer,
   widget: {
      finRateIntraday:      appWidgetFinRateIntraday,
      finRateMovingAvg:     appWidgetFinRateMovingAvg,
      networkEndpoints:     appWidgetNetworkEndpoints,
      networkLog:           appWidgetNetworkLog,
      networkRestTool:      appWidgetNetworkRestTool,
      projectContributors:  appWidgetProjectContributors,
      projectJsonQuestions: appWidgetProjectJsonQuestions,
      spaceStarships:       appWidgetSpaceStarships,
      spaceVehicles:        appWidgetSpaceVehicles,
      spacexBooks:          appWidgetSpacexBooks,
      spacexPics:           appWidgetSpacexPics,
      transBartDepartures:  appWidgetTransBartDepartures,
      transBartStations:    appWidgetTransBartStations,
      transF1TopCountries:  appWidgetTransF1TopCountries,
      transNycBikeStations: appWidgetTransNycBikeStations,
      },
   };

app.controller.setup();

export { app };
