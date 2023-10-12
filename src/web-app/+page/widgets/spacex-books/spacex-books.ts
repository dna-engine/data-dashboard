// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { dna } from 'dna-engine';
import { fetchJson } from 'fetch-json';

// Modules
import { webAppUtil } from '../../modules/util';

// Types
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

const webAppWidgetSpacexBooks = {
   show(widgetElem: Element): void {
      const url =      'https://www.googleapis.com/books/v1/volumes';
      const params =   { q: 'spacex' };
      const hasCover = (book: Book) => !!book.volumeInfo.imageLinks;
      const fixHttpProtocol = (book: Book) => book.volumeInfo.imageLinks.thumbnail =
         book.volumeInfo.imageLinks.thumbnail.replace('http:', 'https:');
      const handleData = (data: RawData) => {
         webAppUtil.spinnerStop(widgetElem);
         const model = <WidgetModel>dna.getModel(widgetElem);
         model.books = data.items.filter(hasCover);
         model.books.forEach(fixHttpProtocol);
         dna.refresh(widgetElem);
         };
      webAppUtil.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { webAppWidgetSpacexBooks };
