### Steps of loading javascript component with markdown

When you not only like to load js components, but also show notes in control panel.

1. Create xxx.stories.js under the target folder.

```js
import { loadJSWithNotesStories } from 'storybook-loader';
import { withNotes } from '@storybook/addon-notes';

const req = require.context('./');
const options = {
  // [optional] you can also addDecorator(withNotes) in config.js
  storySubFuncList: [
    [
      'addDecorator',
      [withNotes],
    ],
  ],
};

loadJSWithNotesStories(reqList, options);
```

2. Create sub folder and add md files.

The following structure:
```
./folder1/pattern1.js
./folder1/pattern1.md
./folder1/pattern2.js
./folder1/pattern2.md
./folder2/pattern1.jsx
./folder2/pattern1.md
./folder2/pattern2.jsx
```

will display like this
```
folder1
 |-pattern1 (display folder1/pattern1.md in notes panel)
 |-pattern2 (display folder1/pattern2.md in notes panel)
folder2
 |-pattern1 (display folder2/pattern1.md in notes panel)
 |-pattern2 (display nothing in notes panel)
```