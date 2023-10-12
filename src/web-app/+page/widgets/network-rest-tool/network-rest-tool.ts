// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { dna } from 'dna-engine';
import { fetchJson } from 'fetch-json';
import { prettyPrintJson } from 'pretty-print-json';

// Modules
import { webAppUtil } from '../../modules/util';

// Types
type WidgetModel = {
   restError: boolean,
   url:       string,
   jsonHtml:  string,
   };
type RawData = unknown & { error?: boolean, name?: string, message?: string };
type ElemLookup = {
   widget: HTMLElement,
   input:  HTMLInputElement,
   button: HTMLButtonElement,
   };

const webAppWidgetNetworkRestTool = {
   elem: <ElemLookup | null>null,
   get(button?: Element): void {
      const elem =  webAppWidgetNetworkRestTool.elem!;
      const model = <WidgetModel>dna.getModel(elem.widget);
      const handleData = (data: RawData) => {
         model.restError = !!data.error;
         model.jsonHtml = prettyPrintJson.toHtml(data);
         dna.refresh(elem.widget, { html: true });
         webAppUtil.spinnerStop(elem.widget);
         elem.button.disabled = false;
         if (button)
            elem.input.focus();
         };
      const handleError = (error: RawData) =>
         handleData({ error: true, name: error.name!, message: error.message! });
      webAppUtil.spinnerStart(elem.widget);
      model.url = <string>elem.input.value;
      fetchJson.get(model.url).then(handleData).catch(handleError);
      },
   show(widgetElem: HTMLElement): void {
      const defaultRestUrl = 'https://dna-engine.org/api/books/1/';
      const elem = {
         widget: widgetElem,
         input:  widgetElem.querySelector('input')!,
         button: widgetElem.querySelector('button')!,
         };
      webAppWidgetNetworkRestTool.elem = elem;
      elem.input.value = defaultRestUrl;
      webAppWidgetNetworkRestTool.get();
      },
   };

export { webAppWidgetNetworkRestTool };
