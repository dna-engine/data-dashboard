// DataDashboard
// Widget controller

import { dna } from 'dna.js';
import { fetchJson } from 'fetch-json';
import { app } from '../../ts/app.js';

// [
//    {
//       login:               "dpilafian",
//       id:                  119555,
//       node_id:             "MDQ6VXNlcjExOTU1NQ==",
//       avatar_url:          "https://avatars1.githubusercontent.com/u/119555?v=4",
//       gravatar_id:         "",
//       url:                 "https://api.github.com/users/dpilafian",
//       html_url:            "https://github.com/dpilafian",
//       followers_url:       "https://api.github.com/users/dpilafian/followers",
//       following_url:       "https://api.github.com/users/dpilafian/following{/other_user}",
//       gists_url:           "https://api.github.com/users/dpilafian/gists{/gist_id}",
//       starred_url:         "https://api.github.com/users/dpilafian/starred{/owner}{/repo}",
//       subscriptions_url:   "https://api.github.com/users/dpilafian/subscriptions",
//       organizations_url:   "https://api.github.com/users/dpilafian/orgs",
//       repos_url:           "https://api.github.com/users/dpilafian/repos",
//       events_url:          "https://api.github.com/users/dpilafian/events{/privacy}",
//       received_events_url: "https://api.github.com/users/dpilafian/received_events",
//       type:                "User",
//       site_admin:          false,
//       contributions:       732
//    },
//    ...

type WidgetModel = {
   contributors: {
      html_url: string,
      avatar_url: string,
      login: string,
      }[],
   };
type RawData = WidgetModel['contributors'];

const appWidgetProjectContributors = {
   show(widgetElem: JQuery) {
      const url = 'https://api.github.com/repos/dnajs/dna.js/contributors';
      const handleData = (data: RawData) => {
         app.util.spinnerStop(widgetElem);
         const model = <WidgetModel>dna.getModel(widgetElem);
         model.contributors = data;
         dna.refresh(widgetElem);
         };
      app.util.spinnerStart(widgetElem);
      fetchJson.get(url).then(handleData);
      },
   };

export { appWidgetProjectContributors };
