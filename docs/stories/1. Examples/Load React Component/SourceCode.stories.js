import loadSourceCodeMd from '../../util/loadSourceCodeMd';
import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./', false, /\.md$/);
const options = {
  hierarchyRoot: HierarchyRoot.ReactComponent,
};

loadSourceCodeMd(req, options);
