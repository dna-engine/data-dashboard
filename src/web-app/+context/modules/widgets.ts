// DataDashboard ~~ MIT License
// Widgets

// Modules
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
import { appWidgetTransBartDepartures } from '../widgets/trans-bart-departures/trans-bart-departures';
import { appWidgetTransBartStations } from '../widgets/trans-bart-stations/trans-bart-stations';
import { appWidgetTransF1TopCountries } from '../widgets/trans-f1-top-countries/trans-f1-top-countries';
import { appWidgetTransNycBikeStations } from '../widgets/trans-nyc-bike-stations/trans-nyc-bike-stations';

const appWidgets = {
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
   transBartDepartures:  appWidgetTransBartDepartures,
   transBartStations:    appWidgetTransBartStations,
   transF1TopCountries:  appWidgetTransF1TopCountries,
   transNycBikeStations: appWidgetTransNycBikeStations,
   };

export { appWidgets };
