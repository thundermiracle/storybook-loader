# Source Code of Load Material-ui with Layout

```js
import { loadJSStories } from 'storybook-loader';

import withPaperbase from './util/withPaperbase';

const req = require.context('./');
const options = {
  contentFuncList: [
    withPaperbase,
  ],
  hierarchyRoot: 'Example|Load Material-UI/',
  excludeRegExp: /util/,
};

loadJSStories(req, options);
```