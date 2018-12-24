// DataDashboard
// Widget controller

dataDashboard.widget.widgetC = {
   show: (widgetElem) => {
      dataDashboard.util.spinnerStart(widgetElem);
      const x = () => dataDashboard.util.spinnerStop(widgetElem);
      window.setTimeout(x, 5000);
      }
   };
