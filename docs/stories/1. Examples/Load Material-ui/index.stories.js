import { loadJSStories } from 'storybook-loader';

import withPaperbase from './util/withPaperbase';
import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./');
const options = {
  contentFuncList: [withPaperbase],
  hierarchyRoot: HierarchyRoot.MaterialUI,
  excludeRegExp: /util/,
};

loadJSStories(req, options);
