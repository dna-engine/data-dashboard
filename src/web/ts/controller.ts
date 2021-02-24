// DataDashboard
// Controller

import { dna, DnaCallback } from 'dna.js';
import { fetchJson, FetchJsonLogger } from 'fetch-json';
import { libX } from 'web-ignition';
import { app } from './app';
import { AppWidget } from './config';

const appController = {
   showPanel(panelElem: JQuery): JQuery {
      window.scrollTo({ top: 0 });
      const showWidget = (node: HTMLElement, i: number) => {
         const widgetElem = $(node);
         const widget = <AppWidget>dna.getModel(widgetElem);
         const msg = {
            missingWidget:     'DataDashboard - Missing widget, index: %s, panel: %s',
            missingController: 'DataDashboard - Widget controller missing: %s',
            };
         if (!widget)
            throw Error(dna.util.printf(msg.missingWidget, i, panelElem.data().hash));
         widgetElem.find('>app-widget-body').remove();
         widgetElem.append(dna.clone(widget.code, {}));
         const widgetController = app.widget[dna.util.toCamel(widget.code)];
         if (!widgetController)
            throw Error(dna.util.printf(msg.missingController, widget.code));
         widgetController.show(widgetElem);
         };
      panelElem.find('>app-widgets').children().toArray().forEach(showWidget);
      return panelElem;
      },
   jsdomWorkarounds(): void {
      fetchJson.enableLogger();  //prevent localStorage race condition
      class StubOutChart {}
      window['Chart'] = StubOutChart;  //prevent UnhandledPromiseRejectionWarning
      const stubFn = () => { /* noop */ };
      window.scrollTo = stubFn;  //prevent Error: Not implemented: window.scrollTo
      },
   setup(): void {
      libX.ui.autoDisableButtons();
      dna.registerInitializer(<DnaCallback>libX.bubbleHelp.setup);
      fetchJson.enableLogger(<FetchJsonLogger>app.network.logEvent);
      if (navigator.userAgent.includes('jsdom'))
         app.controller.jsdomWorkarounds();
      app.lookup.panels.forEach(panel =>
         panel.widgetList = panel.widgets.map(code => <AppWidget>(app.lookup.widget[code])));
      const displayedPanels = app.lookup.panels.filter(panel => panel.display);
      const onLoadSetup = () => {
         dna.clone('app-menu-item', displayedPanels);
         dna.clone('app-panel',     displayedPanels);
         };
      $(onLoadSetup);
      },
   };

export { appController };
