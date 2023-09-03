// DataDashboard ~~ MIT License
// Application

// Modules
import { appConfig, AppChartColor, AppPanel, AppWidget } from './+context/modules/config';
import { appController } from './+context/modules/controller';
import { appLookup } from './+context/modules/lookup';
import { appNetwork, appTransformer, appUtil } from './+context/modules/util';
import { appWidgets } from './+context/modules/widgets';

// Types
export type AppWidgetMap =     { [code: string]: AppWidget };
export type AppPanelMap =      { [code: string]: AppPanel };
export type AppChartColorMap = { [code: string]: AppChartColor };
export type AppParamValue =    string | number | boolean | null;
export type AppParams =        { [param: string]: AppParamValue };
export type AppDataObject =    Record<string, unknown>;

const webApp = {
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
      webApp.controller.setup();
      },
   };

webApp.setup();

export default webApp;
