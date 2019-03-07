# Source Code of Load React Component

```js
import { loadJSStories } from 'storybook-loader';

const req = require.context('./');
const options = {
  hierarchyRoot: 'Examples|Load React Component/',
};

loadJSStories(req, options);
```