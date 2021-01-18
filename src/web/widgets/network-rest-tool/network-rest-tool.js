// DataDashboard
// Widget controller

app.widget.networkRestTool = {
   elem: null,
   get(button) {
      const elem = app.widget.networkRestTool.elem;
      const model = dna.getModel(elem.widget);
      const handleData = (data) => {
         model.restError = !!data.error;
         model.jsonHtml = window.prettyPrintJson.toHtml(data);
         dna.refresh(elem.widget, { html: true });
         app.util.spinnerStop(elem.widget);
         elem.button.enable();
         if (button)
            elem.input.focus();
         };
      const handleError = (error) => handleData({ exception: error.name, error: error.message });
      app.util.spinnerStart(elem.widget);
      model.url = elem.input.val();
      fetchJson.get(model.url).then(handleData).catch(handleError);
      },
   show(widgetElem) {
      const defaultRestUrl = 'https://dnajs.org/rest/book/1/';
      const elem = {
         widget: widgetElem,
         input:  widgetElem.find('input'),
         button: widgetElem.find('button'),
         };
      app.widget.networkRestTool.elem = elem;
      elem.input.val(defaultRestUrl);
      app.widget.networkRestTool.get();
      },
   };
