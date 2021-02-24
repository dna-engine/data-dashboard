// DataDashboard
// Widget controller

import { dna } from 'dna.js';
import { app, AppCallback } from '../../ts/app';

// {
//    title: "Recent Uploads tagged spacex",
//    link: "https://www.flickr.com/photos/tags/spacex/",
//    description: "",
//    modified: "2019-01-06T02:04:41Z",
//    generator: "https://www.flickr.com",
//    items: [
//       {
//          title: "SpaceX thất bại trong lần thử nghiệm hạ cánh tên lửa lần thứ 3",
//          link: "https://www.flickr.com/photos/144571018@N07/46570916282/",
//          media: {
//             m: "https://farm5.staticflickr.com/4862/46570916282_f8169babd7_m.jpg"
//          },
//          date_taken: "2019-01-05T18:04:41-08:00",
//          description: " <p>...",
//          published: "2019-01-06T02:04:41Z",
//          author: "nobody@flickr.com ("kinhnghiemtinhoc")",
//          author_id: "144571018@N07",
//          tags: "spacex thất bại trong lần thử nghiệm hạ cánh tên lửa thứ 3"
//       },
//       ...

type WidgetModel = {
   photos: {
      title:      string,
      date:       string,
      date_taken: string,
      link:       string,
      media:      { m: string },
      }[],
   };
type RawData = {
   items: WidgetModel['photos'],
   };

const appWidgetSpacexPics = {
   show(widgetElem: JQuery): void {
      const url = 'https://api.flickr.com/services/feeds/photos_public.gne';
      const params = { format: 'json', tags: 'spacex' };
      const handleData = (data: RawData) => {
         app.util.spinnerStop(widgetElem);
         data.items.forEach(item => item.date = item.date_taken.substring(0, 10));
         const model = <WidgetModel>dna.getModel(widgetElem);
         model.photos = data.items;
         dna.refresh(widgetElem);
         };
      app.util.spinnerStart(widgetElem);
      app.util.fetchJsonp(url, params, 'jsonFlickrFeed', <AppCallback>handleData);
      },
   };

export { appWidgetSpacexPics };
