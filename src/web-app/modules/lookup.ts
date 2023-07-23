// DataDashboard ~~ MIT License
// Lookup

// Modules
import { AppChartColorMap, AppPanelMap, AppWidgetMap } from '../app';
import { appConfig, AppPanel } from './config';

const appLookup = {
   widgets:     appConfig.widgets,
   panels:      <AppPanel[]>appConfig.panels,
   chartColors: appConfig.chartColors,
   widget:      <AppWidgetMap>dna.array.toMap(appConfig.widgets),
   panel:       <AppPanelMap>dna.array.toMap(appConfig.panels),
   chartColor:  <AppChartColorMap>dna.array.toMap(appConfig.chartColors),
   };

export { appLookup };
