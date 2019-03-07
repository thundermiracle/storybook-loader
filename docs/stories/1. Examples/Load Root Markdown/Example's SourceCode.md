# Source Code of Load Markdown

```js
import { loadMDStories } from 'storybook-loader';
import { doc } from 'storybook-readme';

const req = require.context('./');

const options = {
  contentFuncList: [
    doc,
  ],
  ignoreDotFolder: false,
  dotFolderName: '',
  hierarchyRoot: 'Examples|Load Markdown in root/',
};

loadMDStories(req, options);

```