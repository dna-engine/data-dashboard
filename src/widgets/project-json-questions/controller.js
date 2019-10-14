// DataDashboard
// Widget controller

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

app.widget.projectJsonQuestions = {
   displayDataChart: (widgetElem, data) => {
      const numItems = app.util.chartColors.length;
      const title =    'Active JSON Questions';
      const subtitle = 'Page views of ' + numItems + ' most recently active JSON questions';
      const mostRecent = data.slice(0, numItems).sort((a, b) => b.view_count - a.view_count);
      const dataset = {
         backgroundColor: app.util.chartColors,
         data:            mostRecent.map(item => item.view_count)
         };
      const chartInfo = {
         type: 'pie',
         data: {
            labels:   mostRecent.map(item => item.owner.display_name),
            datasets: [dataset]
            },
         options: {
            maintainAspectRatio: false,
            title: { display: true, text: [title, subtitle] }
            }
         };
      widgetElem.data().chart = new window.Chart(widgetElem.find('canvas'), chartInfo);
      library.ui.normalize(widgetElem);
      },
   displayDataTable: (widgetElem, data) => {
      const tableElem = widgetElem.find('figure table');
      const dataTable = new window.simpleDatatables.DataTable(tableElem[0]);
      data.forEach(item => item.timestamp = app.util.secsToStr(item.last_activity_date));
      data.forEach(item => item.link = '<span data-href=' + item.link + '>' + item.title + '</span>');
      const headers = [
         'Last activity',
         'Owner',
         'Answered',
         'Views',
         'Score',
         'Title'
         ];
      const rows = data.map(item => [
         item.timestamp,
         item.owner.display_name,
         item.is_answered,
         item.view_count,
         item.score || 0,
         item.link
         ]);
      app.transformer.dataTablesNormalizer(rows);
      dataTable.insert({ headings: headers, data: rows });
      widgetElem.data().table = dataTable;
      },
   show: (widgetElem) => {
      const url = 'https://api.stackexchange.com/2.2/search';
      const params = { order: 'desc', sort: 'activity', intitle: 'json', site: 'stackoverflow' };
      const handleData = (data) => {
         app.util.spinnerStop(widgetElem);
         app.widget.projectJsonQuestions.displayDataChart(widgetElem, data.items);
         app.widget.projectJsonQuestions.displayDataTable(widgetElem, data.items);
         };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url, params).then(handleData);
      }
   };
