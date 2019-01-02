// DataDashboard
// Widget controller

dataDashboard.widget.networkEndpoints = {
   show: (widgetElem) => {
      const model = dna.getModel(widgetElem);
      model.endpoints = [
         { name: 'Alpha Vantage API', base: 'https://www.alphavantage.co/query', docs: 'https://www.alphavantage.co/documentation' },
         { name: 'BART API',          base: 'https://api.bart.gov/api',          docs: 'https://api.bart.gov/docs/overview/examples.aspx' },
         { name: 'Citi Bike',         base: 'https://gbfs.citibikenyc.com',      docs: 'https://www.citibikenyc.com/system-data' },
         { name: 'GitHub REST API',   base: 'https://api.github.com',            docs: 'https://developer.github.com/v3' },
         { name: 'Google Books APIs', base: 'https://www.googleapis.com/books',  docs: 'https://developers.google.com/books' },
         { name: 'Flickr API',        base: 'https://api.flickr.com/services',   docs: 'https://www.flickr.com/services/feeds/docs/photos_public' },
         { name: 'The Star Wars API', base: 'https://swapi.co/api',              docs: 'https://swapi.co/documentation' }
         ];
      dna.refresh(widgetElem);
      }
   };