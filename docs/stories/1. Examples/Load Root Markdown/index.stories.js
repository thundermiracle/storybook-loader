import { loadMDStories } from 'storybook-loader';
import { doc } from 'storybook-readme';

import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./');

const options = {
  contentFuncList: [doc],
  ignoreDotFolder: false,
  dotFolderName: '',
  hierarchyRoot: HierarchyRoot.RootMarkdown,
};

loadMDStories(req, options);
