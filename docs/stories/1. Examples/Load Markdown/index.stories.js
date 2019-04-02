import { loadMDStories } from 'storybook-loader';
import { doc } from 'storybook-readme';

import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./');
const options = {
  contentFuncList: [doc],
  hierarchyRoot: HierarchyRoot.Markdown,
  storySubFuncList: [['addParameters', [{ options: { showPanel: false } }]]],
};

loadMDStories(req, options);
