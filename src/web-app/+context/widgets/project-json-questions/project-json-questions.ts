// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { Chart, ChartConfiguration, ChartDataset } from 'chart.js';
import { fetchJson } from 'fetch-json';
import { libX } from 'web-ignition';
import { DataTable } from 'simple-datatables';

// Modules
import { webAppTransformer, webAppUtil } from '../../modules/util';
import { webAppLookup } from '../../modules/lookup';
class DT extends DataTable {}
declare namespace simpleDatatables { class DataTable extends DT {} }  //eslint-disable-line

// {
//    items: [
//       {
//          tags: [
//             "json",
//             "parsing",
//             "hbase",
//             "apache-nifi"
//          ],
//          owner: {
//             reputation: 6,
//             user_id: 10807867,
//             user_type: "registered",
//             profile_image: "https://www.gravatar.com/avatar/a0f9e52bb97fb84a1c6664b7046f42c9?s=128&d=identicon&r=PG&f=1",
//             display_name: "Appy22",
//             link: "https://stackoverflow.com/users/10807867/appy22"
//          },
//          is_answered: false,
//          view_count: 25,
//          answer_count: 1,
//          score: 0,
//          last_activity_date: 1546395632,
//          creation_date: 1546117967,
//          last_edit_date: 1546395632,
//          question_id: 53973373,
//          link: "https://stackoverflow.com/questions/53973373/parsing-incoming-json-message-coming-from-a-nifi-stream-into-hbase-table",
//          title: "Parsing incoming Json message coming from a NiFi Stream into Hbase table"
//       },
//       ...

// Types
type RawDataItem = {
   is_answered:        boolean,
   last_activity_date: number,
   link:               string,
   owner:              { display_name: string },
   score?:             number,
   timestamp?:         string,
   title:              string,
   view_count:         number,
   };
type RawData = { items: RawDataItem[] };

const webAppWidgetProjectJsonQuestions = {
   displayDataChart(widgetElem: Element, data: RawDataItem[]): void {
      const numItems =   webAppLookup.chartColors.length;
      const title =      'Active JSON Questions';
      const subtitle =   'Page views of ' + numItems + ' most recently active JSON questions';
      const mostRecent = data.slice(0, numItems).sort((a, b) => b.view_count - a.view_count);
      const dataset: ChartDataset = {
         backgroundColor: webAppLookup.chartColors.map(color => color.value),
         data:            mostRecent.map(item => item.view_count),
         };
      const chartInfo = <ChartConfiguration>{
         type: 'pie',
         data: {
            labels:   mostRecent.map(item => item.owner.display_name),
            datasets: [dataset],
            },
         options: {
            maintainAspectRatio: false,
            plugins: {
               title: { display: true, text: [title, subtitle] },
               },
            },
         };
      const canvas = widgetElem.querySelector('canvas')!;
      dna.dom.state(widgetElem).chart = new Chart(canvas, chartInfo);
      libX.ui.normalize(widgetElem);
      },
   displayDataTable(widgetElem: Element, data: RawDataItem[]): void {
      const tableElem = <HTMLTableElement>widgetElem.querySelector('figure table');
      const dataTable = new simpleDatatables.DataTable(tableElem);
      data.forEach(item => item.timestamp = webAppUtil.secsToStr(item.last_activity_date));
      data.forEach(item => item.link =      `<span data-href="${item.link}">${item.title}</span>`);
      const headers = [
         'Last activity',
         'Owner',
         'Answered',
         'Views',
         'Score',
         'Title',
         ];
      const rows = data.map(item => [
         item.timestamp ?? '',
         item.owner.display_name,
         item.is_answered,
         item.view_count,
         item.score || 0,
         item.link,
         ]);
      webAppTransformer.dataTablesNormalizer(rows);
      dataTable.insert({ headings: headers, data: rows });
      dna.dom.state(widgetElem).table = dataTable;
      },
   show(widgetElem: Element): void {
      const url =    'https://api.stackexchange.com/2.2/search';
      const params = { order: 'desc', sort: 'activity', intitle: 'json', site: 'stackoverflow' };
      const handleData = (data: RawData) => {
         webAppUtil.spinnerStop(widgetElem);
         webAppWidgetProjectJsonQuestions.displayDataChart(widgetElem, data.items);
         webAppWidgetProjectJsonQuestions.displayDataTable(widgetElem, data.items);
         };
      webAppUtil.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      },
   };

export { webAppWidgetProjectJsonQuestions };
