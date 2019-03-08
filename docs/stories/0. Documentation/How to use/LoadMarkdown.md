### Steps of loading markdown

1. Create xxx.stories.js under the target folder.

   storybook 4.x
    ```js
    import { loadMDStories } from 'storybook-loader';
    import { doc } from 'storybook-readme';

    const req = require.context('./');
    const options = {
      // decorate md's content
      contentFuncList: [
        doc,
      ],
      // [optional] hide AddOnPanel
      storySubFuncList: [
        [
          'addParameters',
          [{ options: { showAddonPanel: false } }],
        ],
      ],
    }

    loadMDStories(req, options);
    ```

   storybook 5.x
    ```js
    import { loadMDStories } from 'storybook-loader';
    import { doc } from 'storybook-readme';

    const req = require.context('./');
    const options = {
      // decorate md's content
      contentFuncList: [
        doc,
      ],
      // [optional] hide AddOnPanel
      storySubFuncList: [
        [
          'addParameters',
          [{ options: { showPanel: false } }],
        ],
      ],
    }

    loadMDStories(req, options);
    ```

2. Create sub folder and add md files.

   The following structure:
    ```
    ./rootPattern1.md
    ./folder1/pattern1.md
    ./folder1/pattern2.md
    ./folder2/pattern1.md
    ./folder2/pattern2.md
    ```

   will display like this(rootPattern1 will be ignored):
    ```
    folder1
    |-pattern1
    |-pattern2
    folder2
    |-pattern1
    |-pattern2
    ```
