// DataDashboard
// Widget controller

import { dna } from 'dna.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app';

type WidgetModel = {
   books: {
      volumeInfo: {
         title:       string,
         imageLinks:  { thumbnail: string },
         previewLink: string,
         publisher:   string,
         },
      saleInfo: {
         listPrice: { amount: number },
         },
      }[],
   };
type RawData = {
   items: WidgetModel['books'],
   };

const appWidgetSpacexBooks = {
   show(widgetElem: JQuery): void {
      const url = 'https://www.googleapis.com/books/v1/volumes';
      const params = { q: 'spacex' };
      const handleData = (data: RawData) => {
         app.util.spinnerStop(widgetElem);
         data.items = data.items.filter(book => book.volumeInfo.imageLinks);
         const model = <WidgetModel>dna.getModel(widgetElem);
         model.books = data.items;
         dna.refresh(widgetElem);
         };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetSpacexBooks };
