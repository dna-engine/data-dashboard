// DataDashboard ~~ MIT License
// Widget controller

import { dna } from 'dna-engine';
import { fetchJson } from 'fetch-json';
import { app } from '../../app';

type RawData = {
   items: Book[],
   };
type WidgetModel = {
   books: Book[],
   };
type Book = {
   volumeInfo: {
      title:       string,
      imageLinks:  { thumbnail: string },
      previewLink: string,
      publisher:   string,
      },
   saleInfo: {
      listPrice: { amount: number },
      },
   };

const appWidgetSpacexBooks = {
   show(widgetElem: Element): void {
      const url =      'https://www.googleapis.com/books/v1/volumes';
      const params =   { q: 'spacex' };
      const hasCover = (book: Book) => !!book.volumeInfo.imageLinks;
      const fixHttpProtocol = (book: Book) => book.volumeInfo.imageLinks.thumbnail =
         book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:');
      const handleData = (data: RawData) => {
         app.util.spinnerStop(widgetElem);
         const model = <WidgetModel>dna.getModel(widgetElem);
         model.books = data.items.filter(hasCover);
         model.books.forEach(fixHttpProtocol);
         dna.refresh(widgetElem);
         };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { appWidgetSpacexBooks };
