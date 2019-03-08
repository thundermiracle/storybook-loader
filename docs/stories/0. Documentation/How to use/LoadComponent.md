### Steps of loading javascript component

1. Create xxx.stories.js under the target folder.

    ```js
    import { loadJSStories } from 'storybook-loader';

    const req = require.context('./');

    loadJSStories(req);
    ```

2. Create sub folder and add js files.

   The following structure:
    ```
    ./rootPattern1.js
    ./folder1/pattern1.js
    ./folder1/pattern2.js
    ./folder2/pattern1.jsx
    ./folder2/pattern2.jsx
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
