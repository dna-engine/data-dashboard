// DataDashboard ~~ MIT License
// Widget controller

// Imports
import { dna } from 'dna-engine';
import { fetchJson } from 'fetch-json';

// Modules
import { webAppUtil } from '../../modules/util';

// [
//    {
//       login:               "pilafmon",
//       id:                  119555,
//       node_id:             "MDQ6VXNlcjExOTU1NQ==",
//       avatar_url:          "https://avatars.githubusercontent.com/u/119555?v=4",
//       gravatar_id:         "",
//       url:                 "https://api.github.com/users/pilafmon",
//       html_url:            "https://github.com/pilafmon",
//       followers_url:       "https://api.github.com/users/pilafmon/followers",
//       following_url:       "https://api.github.com/users/pilafmon/following{/other_user}",
//       gists_url:           "https://api.github.com/users/pilafmon/gists{/gist_id}",
//       starred_url:         "https://api.github.com/users/pilafmon/starred{/owner}{/repo}",
//       subscriptions_url:   "https://api.github.com/users/pilafmon/subscriptions",
//       organizations_url:   "https://api.github.com/users/pilafmon/orgs",
//       repos_url:           "https://api.github.com/users/pilafmon/repos",
//       events_url:          "https://api.github.com/users/pilafmon/events{/privacy}",
//       received_events_url: "https://api.github.com/users/pilafmon/received_events",
//       type:                "User",
//       user_view_type:      "public",
//       site_admin:          false,
//       contributions:       1191
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
