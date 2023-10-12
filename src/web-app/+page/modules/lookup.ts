// DataDashboard ~~ MIT License
// Lookup

// Modules
import { WebAppChartColorMap, WebAppPanelMap, WebAppWidgetMap } from '../../web-app';
import { webAppConfig, WebAppPanel } from './config';

const webAppLookup = {
   widgets:     webAppConfig.widgets,
   panels:      <WebAppPanel[]>webAppConfig.panels,
   chartColors: webAppConfig.chartColors,
   widget:      <WebAppWidgetMap>dna.array.toMap(webAppConfig.widgets),
   panel:       <WebAppPanelMap>dna.array.toMap(webAppConfig.panels),
   chartColor:  <WebAppChartColorMap>dna.array.toMap(webAppConfig.chartColors),
   };

export { webAppLookup };
