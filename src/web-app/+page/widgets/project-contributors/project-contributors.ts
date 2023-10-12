// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { dna } from 'dna-engine';
import { fetchJson } from 'fetch-json';

// Modules
import { webAppUtil } from '../../modules/util';

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

// Types
type WidgetModel = {
   contributors: {
      html_url:   string,
      avatar_url: string,
      login:      string,
      }[],
   };
type RawData = WidgetModel['contributors'];

const webAppWidgetProjectContributors = {
   show(widgetElem: Element): void {
      const url = 'https://api.github.com/repos/dna-engine/dna-engine/contributors';
      const handleData = (data: RawData) => {
         webAppUtil.spinnerStop(widgetElem);
         const model = <WidgetModel>dna.getModel(widgetElem);
         model.contributors = data;
         dna.refresh(widgetElem);
         };
      webAppUtil.spinnerStart(widgetElem);
      fetchJson.get(url).then(handleData);
      },
   };

export { webAppWidgetProjectContributors };
