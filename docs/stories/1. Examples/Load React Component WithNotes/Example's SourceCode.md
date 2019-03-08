# Source Code of Load React Component WithNotes

```js
import { loadJSWithNotesStories } from 'storybook-loader';

const req = require.context('./');
const options = {
  hierarchyRoot: 'Examples|Load React Component WithNotes/',
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

```