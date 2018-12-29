// DataDashboard
// Widget controller

dataDashboard.widget.spacexPics = {
   show: (widgetElem) => {
      const url = 'https://api.flickr.com/services/feeds/photos_public.gne';
      const params = { format: 'json', tags: 'spacex' };
      const handleData = (data) => {
         data.items.forEach(item => item.date = item.date_taken.substring(0, 10));
         dataDashboard.util.spinnerStop(widgetElem);
         const model = dna.getModel(widgetElem);
         model.photos = data.items;
         dna.refresh(widgetElem);
         console.log(data);
         };
      dataDashboard.util.spinnerStart(widgetElem);
      dataDashboard.util.fetchJsonp(url, params, 'jsonFlickrFeed', handleData);
      }
   };
