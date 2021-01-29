// DataDashboard
// Application

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
import { AppChartColor, appConfig, AppPanel, AppWidget } from './config.js';

export type AppOptionsNarrowScreenSaver = Partial<{
   maxPoints:   number,
   screenWidth: number,
   }>;
export type AppWidgetMap =     { [code: string]: AppWidget };
export type AppPanelMap =      { [code: string]: AppPanel };
export type AppChartColorMap = { [code: string]: AppChartColor };
export type AppParamValue =    string | number | boolean | null;
export type AppParams =        { [param: string]: AppParamValue };
export type AppDataObject =    Record<string, unknown>;
export type AppCallback =      (...args: unknown[]) => unknown;

const app = {
   config:      appConfig,
   controller:  appController,
   util:        appUtil,
   network:     appNetwork,
   transformer: appTransformer,
   lookup: {
      widgets:     appConfig.widgets,
      panels:      <AppPanel[]>appConfig.panels,
      chartColors: appConfig.chartColors,
      widget:      <AppWidgetMap>dna.array.toMap(appConfig.widgets),
      panel:       <AppPanelMap>dna.array.toMap(appConfig.panels),
      chartColor:  <AppChartColorMap>dna.array.toMap(appConfig.chartColors),
      },
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
