// DataDashboard
// Application

// Imports
import { dna } from 'dna.js';
import { appController } from './controller';
import { appNetwork, appTransformer, appUtil } from './util';

// Widgets
import { appWidgetFinRateIntraday } from '../widgets/fin-rate-intraday/fin-rate-intraday';
import { appWidgetFinRateMovingAvg } from '../widgets/fin-rate-moving-avg/fin-rate-moving-avg';
import { appWidgetNetworkEndpoints } from '../widgets/network-endpoints/network-endpoints';
import { appWidgetNetworkLog } from '../widgets/network-log/network-log';
import { appWidgetNetworkRestTool } from '../widgets/network-rest-tool/network-rest-tool';
import { appWidgetProjectContributors } from '../widgets/project-contributors/project-contributors';
import { appWidgetProjectJsonQuestions } from '../widgets/project-json-questions/project-json-questions';
import { appWidgetSpaceStarships } from '../widgets/space-starships/space-starships';
import { appWidgetSpaceVehicles } from '../widgets/space-vehicles/space-vehicles';
import { appWidgetSpacexBooks } from '../widgets/spacex-books/spacex-books';
import { appWidgetSpacexPics } from '../widgets/spacex-pics/spacex-pics';
import { appWidgetTransBartDepartures } from '../widgets/trans-bart-departures/trans-bart-departures';
import { appWidgetTransBartStations } from '../widgets/trans-bart-stations/trans-bart-stations';
import { appWidgetTransF1TopCountries } from '../widgets/trans-f1-top-countries/trans-f1-top-countries';
import { appWidgetTransNycBikeStations } from '../widgets/trans-nyc-bike-stations/trans-nyc-bike-stations';
import { AppChartColor, appConfig, AppPanel, AppWidget } from './config';

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
