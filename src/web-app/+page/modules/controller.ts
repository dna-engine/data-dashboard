// DataDashboard ~~ MIT License
// Controller

// Imports
import { dna, DnaCallback } from 'dna-engine';
import { fetchJson, FetchJsonLogger } from 'fetch-json';
import { libX } from 'web-ignition';

// Modules
import { WebAppWidget } from './config';
import { webAppLookup } from './lookup';
import { webAppNetwork } from './util';
import { webAppWidgets, WebAppWidgetsKey, WebAppWidgetCode } from './widgets';

const webAppController = {
   // <main>
   //    <web-app-panels>
   //       <web-app-panel data-hash=~~code~~>
   //          <header>h2>~~header~~</h2></header>
   //          <web-app-widgets>
   //             <web-app-widget data-array=~~widgetList~~ data-class=~~code~~>
   //                <header><h2>~~header~~</h2></header>
   //             </web-app-widget>
   //          </web-app-widgets>
   //       </web-app-panel>
   //    </web-app-panels>
   // </main>
   showPanel(panelElem: HTMLElement): Element {
      globalThis.window.scrollTo({ top: 0 });
      const webAppWidgetsElem = panelElem.querySelector('web-app-widgets')!;
      const showWidget = (widgetElem: Element) => {
         const widget: WebAppWidget | null = dna.getModel(widgetElem) ?? null;
         const msg = {
            missingWidget:     'Missing widget, index: %s, panel: %s',
            missingController: 'Widget controller missing: %s',
            };
         if (!widget)
            throw new Error('[data-dashboard] ' + dna.util.printf(msg.missingWidget, panelElem.dataset.hash));
         widgetElem.querySelector('web-app-widget-body')?.remove();
         widgetElem.appendChild(<Element>dna.clone(widget.code, {}));
         const webAppWidgetsKey = <WebAppWidgetsKey>dna.util.toCamel(widget.code);
         const widgetController = <WebAppWidgetCode | undefined>webAppWidgets[webAppWidgetsKey];
         if (!widgetController)
            throw new Error('[data-dashboard] ' + dna.util.printf(msg.missingController, widget.code));
         widgetController.show(<HTMLElement>widgetElem);
         };
      dna.dom.forEach(webAppWidgetsElem.children, showWidget);
      return panelElem;
      },
   setup(): void {
      libX.ui.autoDisableButtons();
      dna.registerInitializer(<DnaCallback>libX.bubbleHelp.setup);
      fetchJson.enableLogger(<FetchJsonLogger>webAppNetwork.logEvent);
      webAppLookup.panels.forEach(panel =>
         panel.widgetList = panel.widgets.map(code => <WebAppWidget>(webAppLookup.widget[code])));
      const displayedPanels = webAppLookup.panels.filter(panel => panel.display);
      const onLoadSetup = () => {
         dna.clone('web-app-menu-item', displayedPanels);
         dna.clone('web-app-panel',     displayedPanels);
         };
      dna.dom.onReady(onLoadSetup);
      },
   };

export { webAppController };
