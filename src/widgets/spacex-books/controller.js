// DataDashboard
// Widget controller

dataDashboard.widget.spacexBooks = {
   show: (widgetElem) => {
      const url = 'https://www.googleapis.com/books/v1/volumes';
      const params = { q: 'spacex' };
      const handleData = (data) => {
         dataDashboard.util.spinnerStop(widgetElem);
         data.items = data.items.filter(book => book.volumeInfo.imageLinks);
         const model = dna.getModel(widgetElem);
         model.books = data.items;
         dna.refresh(widgetElem);
         };
      dataDashboard.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      }
   };
