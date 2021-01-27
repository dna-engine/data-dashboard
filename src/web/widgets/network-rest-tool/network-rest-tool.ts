// DataDashboard
// Widget controller

import { dna } from 'dna.js';
import { fetchJson } from 'fetch-json';
import { prettyPrintJson } from 'pretty-print-json';
import { app } from '../../ts/app.js';

type WidgetModel = {
   restError: boolean,
   url:       string,
   jsonHtml:  string,
   };
type RawData = unknown & { error?: boolean, name?: string, message?: string };
type ElemLookup = {
   widget: JQuery,
   input:  JQuery,
   button: JQuery,
   };

const appWidgetNetworkRestTool = {
   elem: <ElemLookup><unknown>null,
   get(button?: JQuery) {
      const elem = app.widget.networkRestTool.elem;
      const model = <WidgetModel>dna.getModel(elem.widget);
      const handleData = (data: RawData) => {
         model.restError = !!data.error;
         model.jsonHtml = prettyPrintJson.toHtml(data);
         dna.refresh(elem.widget, { html: true });
         app.util.spinnerStop(elem.widget);
         elem.button.enable();
         if (button)
            elem.input.trigger('focus');
         };
      const handleError = (error: RawData) => handleData({ error: true, name: error.name, message: error.message });
      app.util.spinnerStart(elem.widget);
      model.url = <string>elem.input.val();
      fetchJson.get(model.url).then(<any>handleData).catch(handleError);
      },
   show(widgetElem: JQuery) {
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

export { appWidgetNetworkRestTool };
