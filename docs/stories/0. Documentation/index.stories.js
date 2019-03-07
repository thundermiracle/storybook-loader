import { loadMDStories } from 'storybook-loader';
import { doc } from 'storybook-readme';

const req = require.context('./');
const options = {
  contentFuncList: [
    doc,
  ],
  hierarchyRoot: 'Documentation|',
  storySubFuncList: [
    [
      'addParameters',
      [{ options: { showAddonPanel: false } }],
    ],
  ],
}

loadMDStories(req, options);
