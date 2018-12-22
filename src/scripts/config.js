// DataDashboard
// Configuration

const dataDashboard = {
   widgets: [
      { code: 'widget-a',  header: 'Widget A' },
      { code: 'widget-b',  header: 'Widget B' },
      { code: 'widget-c',  header: 'Widget C' }
      ],
   panels: [
      { code: 'panel-x', header: 'The X Panel', widgets: ['widget-a', 'widget-b', 'widget-c'] },
      { code: 'panel-y', header: 'The Y Panel', widgets: ['widget-b',] },
      { code: 'panel-z', header: 'The Z Panel', widgets: ['widget-b', 'widget-c'] }
      ]
   };

dataDashboard.widget = {};  //container map for widget controllers
