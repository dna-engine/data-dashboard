// DataDashboard
// Controller

app.controller = {
   showPanel(panelElem) {
      window.scrollTo({ top: 0 });
      const showWidget = (i, elem) => {
         const widgetElem = $(elem);
         const widget = dna.getModel(widgetElem);
         if (!widget)
            throw Error('DataDashboard - Missing widget, index: ' + i + ', panel: ' + panelElem.data().hash);
         widgetElem.find('>app-widget-body').remove();
         widgetElem.append(dna.clone(widget.code, {}));
         const widgetController = app.widget[dna.util.toCamel(widget.code)];
         if (!widgetController)
            throw Error('DataDashboard - Widget controller missing: ' + widget.code);
         widgetController.show(widgetElem);
         };
      panelElem.find('>app-widgets').children().each(showWidget);
      },
   jsdomWorkarounds() {
      fetchJson.enableLogger();  //prevent localStorage race condition
      class StubOutChart {}
      window.Chart = StubOutChart;  //prevent UnhandledPromiseRejectionWarning
      window.scrollTo = () => {};  //prevent Error: Not implemented: window.scrollTo
      },
   setup() {
      library.ui.autoDisableButtons();
      dna.registerInitializer(library.bubbleHelp.setup);
      fetchJson.enableLogger(app.network.logEvent);
      if (navigator.userAgent.includes('jsdom'))
         app.controller.jsdomWorkarounds();
      app.widgetsMap = dna.array.toMap(app.widgets);
      const makeWidgetList = (codes) => codes.map(code => app.widgetsMap[code]);
      const displayedPanels = app.panels.filter(panel => panel.display);
      displayedPanels.forEach(panel => panel.widgetList = makeWidgetList(panel.widgets));
      const onLoadSetup = () => {
         dna.clone('app-menu-item', displayedPanels);
         dna.clone('app-panel',     displayedPanels);
         };
      $(onLoadSetup);
      },
   };
