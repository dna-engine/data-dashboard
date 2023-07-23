// DataDashboard ~~ MIT License
// Application

// Modules
import { appConfig, AppChartColor, AppPanel, AppWidget } from './modules/config';
import { appController } from './modules/controller';
import { appLookup } from './modules/lookup';
import { appNetwork, appTransformer, appUtil } from './modules/util';
import { appWidgets } from './modules/widgets';

// Types
export type AppWidgetMap =     { [code: string]: AppWidget };
export type AppPanelMap =      { [code: string]: AppPanel };
export type AppChartColorMap = { [code: string]: AppChartColor };
export type AppParamValue =    string | number | boolean | null;
export type AppParams =        { [param: string]: AppParamValue };
export type AppDataObject =    Record<string, unknown>;

const app = {
   config:      appConfig,
   controller:  appController,
   util:        appUtil,
   network:     appNetwork,
   transformer: appTransformer,
   lookup:      appLookup,  //maps keyed by code (kebab)
   widgets:     appWidgets,
   setup(): void {
      console.log('DataDashboard');
      console.log('Widgets:', appConfig.widgets.map(widget => widget.code));
      app.controller.setup();
      },
   };

app.setup();

export default app;
