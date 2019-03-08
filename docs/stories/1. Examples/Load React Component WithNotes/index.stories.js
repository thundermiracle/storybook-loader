import { loadJSWithNotesStories } from 'storybook-loader';

import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./');
const options = {
  hierarchyRoot: HierarchyRoot.ReactComponentWithNotes,
  storySubFuncList: [
    [
      'addParameters',
      [{ 
        options: {
          brandTitle: 'storybook-loader-docs',
          brandUrl: 'https://github.com/thundermiracle/storybook-loader',
          panelPosition: 'right',
        }
      }],
    ],
  ],
};

loadJSWithNotesStories(req, options);
