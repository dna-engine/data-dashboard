// DataDashboard ~~ MIT License
// Widgets

// Modules
import { webAppWidgetFinRateIntraday } from '../widgets/fin-rate-intraday/fin-rate-intraday';
import { webAppWidgetFinRateMovingAvg } from '../widgets/fin-rate-moving-avg/fin-rate-moving-avg';
import { webAppWidgetNetworkEndpoints } from '../widgets/network-endpoints/network-endpoints';
import { webAppWidgetNetworkLog } from '../widgets/network-log/network-log';
import { webAppWidgetNetworkRestTool } from '../widgets/network-rest-tool/network-rest-tool';
import { webAppWidgetProjectContributors } from '../widgets/project-contributors/project-contributors';
import { webAppWidgetProjectJsonQuestions } from '../widgets/project-json-questions/project-json-questions';
import { webAppWidgetSpaceStarships } from '../widgets/space-starships/space-starships';
import { webAppWidgetSpaceVehicles } from '../widgets/space-vehicles/space-vehicles';
import { webAppWidgetSpacexBooks } from '../widgets/spacex-books/spacex-books';
import { webAppWidgetTransBartDepartures } from '../widgets/trans-bart-departures/trans-bart-departures';
import { webAppWidgetTransBartStations } from '../widgets/trans-bart-stations/trans-bart-stations';
import { webAppWidgetTransF1TopCountries } from '../widgets/trans-f1-top-countries/trans-f1-top-countries';
import { webAppWidgetTransNycBikeStations } from '../widgets/trans-nyc-bike-stations/trans-nyc-bike-stations';

// Types
export type WebAppWidgetsKey = keyof typeof webAppWidgets;
export type WebAppWidgetCode = typeof webAppWidgets[WebAppWidgetsKey];

const webAppWidgets = {
   finRateIntraday:      webAppWidgetFinRateIntraday,
   finRateMovingAvg:     webAppWidgetFinRateMovingAvg,
   networkEndpoints:     webAppWidgetNetworkEndpoints,
   networkLog:           webAppWidgetNetworkLog,
   networkRestTool:      webAppWidgetNetworkRestTool,
   projectContributors:  webAppWidgetProjectContributors,
   projectJsonQuestions: webAppWidgetProjectJsonQuestions,
   spaceStarships:       webAppWidgetSpaceStarships,
   spaceVehicles:        webAppWidgetSpaceVehicles,
   spacexBooks:          webAppWidgetSpacexBooks,
   transBartDepartures:  webAppWidgetTransBartDepartures,
   transBartStations:    webAppWidgetTransBartStations,
   transF1TopCountries:  webAppWidgetTransF1TopCountries,
   transNycBikeStations: webAppWidgetTransNycBikeStations,
   };

export { webAppWidgets };
