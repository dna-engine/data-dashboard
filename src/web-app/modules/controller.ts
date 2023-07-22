// DataDashboard ~~ MIT License
// Controller

import { dna, DnaCallback } from 'dna-engine';
import { fetchJson, FetchJsonLogger } from 'fetch-json';
import { libX } from 'web-ignition';
import { app } from '../app';
import { AppWidget } from './config';

const appController = {
   // <main>
   //    <app-panels>
   //       <app-panel data-hash=~~code~~>
   //          <header>h2>~~header~~</h2></header>
   //          <app-widgets>
   //             <app-widget data-array=~~widgetList~~ data-class=~~code~~>
   //                <header><h2>~~header~~</h2></header>
   //             </app-widget>
   //          </app-widgets>
   //       </app-panel>
   //    </app-panels>
   // </main>
   showPanel(panelElem: HTMLElement): Element {
      globalThis.scrollTo({ top: 0 });
      const appWidgetsElem = panelElem.querySelector('app-widgets')!;
      const showWidget = (widgetElem: Element) => {
         const widget = <AppWidget>dna.getModel(widgetElem);
         const msg = {
            missingWidget:     'Missing widget, index: %s, panel: %s',
            missingController: 'Widget controller missing: %s',
            };
         if (!widget)
            throw Error('[data-dashboard] ' + dna.util.printf(msg.missingWidget, panelElem.dataset.hash));
         widgetElem.querySelector('app-widget-body')?.remove();
         widgetElem.appendChild(<Element>dna.clone(widget.code, {}));
         const widgetController = app.widget[<keyof typeof app.widget>dna.util.toCamel(widget.code)];
         if (!widgetController)
            throw Error('[data-dashboard] ' + dna.util.printf(msg.missingController, widget.code));
         widgetController.show(<HTMLElement>widgetElem);
         };
      dna.dom.forEach(appWidgetsElem.children, showWidget);
      return panelElem;
      },
   setup(): void {
      libX.ui.autoDisableButtons();
      dna.registerInitializer(<DnaCallback>libX.bubbleHelp.setup);
      fetchJson.enableLogger(<FetchJsonLogger>app.network.logEvent);
      app.lookup.panels.forEach(panel =>
         panel.widgetList = panel.widgets.map(code => <AppWidget>(app.lookup.widget[code])));
      const displayedPanels = app.lookup.panels.filter(panel => panel.display);
      const onLoadSetup = () => {
         dna.clone('app-menu-item', displayedPanels);
         dna.clone('app-panel',     displayedPanels);
         };
      dna.dom.onReady(onLoadSetup);
      },
   };

export { appController };
