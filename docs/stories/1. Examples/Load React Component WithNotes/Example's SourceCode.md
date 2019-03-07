# Source Code of Load React Component WithNotes

```js
import { loadJSWithNotesStories } from 'storybook-loader';
import { withNotes } from '@storybook/addon-notes';

const req = require.context('./');
const options = {
  hierarchyRoot: 'Examples|Load React Component WithNotes/',
  storySubFuncList: [
    [
      'addDecorator',
      [withNotes],
    ],
  ],
};

loadJSWithNotesStories(req, options);

```