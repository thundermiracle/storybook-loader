# Source Code of Load Markdown

```js
import { loadMDStories } from 'storybook-loader';
import { doc } from 'storybook-readme';

const req = require.context('./');
const options = {
  contentFuncList: [
    doc,
  ],
  hierarchyRoot: 'Examples|Load Markdown/',
  storySubFuncList: [
    [
      'addParameters',
      [{ options: { showAddonPanel: false } }],
    ],
  ],
};

loadMDStories(req, options);
```