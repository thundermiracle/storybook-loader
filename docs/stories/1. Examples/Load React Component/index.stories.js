import { loadJSStories } from 'storybook-loader';
import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./');
const options = {
  hierarchyRoot: HierarchyRoot.ReactComponent,
};

loadJSStories(req, options);
