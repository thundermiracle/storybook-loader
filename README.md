<h1 align="center">

storybook-loader

</h1>

[![npm version](https://badge.fury.io/js/storybook-loader.svg)](https://badge.fury.io/js/storybook-loader)
[![Build Status](https://travis-ci.org/thundermiracle/storybook-loader.svg)](https://travis-ci.org/thundermiracle/storybook-loader)
[![dependencies Status](https://david-dm.org/thundermiracle/storybook-loader/status.svg)](https://david-dm.org/thundermiracle/storybook-loader)
[![devDependencies Status](https://david-dm.org/thundermiracle/storybook-loader/dev-status.svg)](https://david-dm.org/thundermiracle/storybook-loader?type=dev)
[![codecov](https://codecov.io/gh/thundermiracle/storybook-loader/branch/master/graph/badge.svg)](https://codecov.io/gh/thundermiracle/storybook-loader)

## Description

storybook-loader is a package for [storybook](https://github.com/storybooks/storybook) to automatically load ALL files in a folder.

storybook-loader analyze the webpack's [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) return value and load the analyzed results to storyies.

After finishing the configuration, you will be free from manually adding story, as storybook-loader will load it for you automatically.

## Installation

storybook-loader is available as an [npm package](https://www.npmjs.org/package/storybook-loader).

```sh
npm install --save--dev storybook-loader
```

## Steps of loading javascript(Component)

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

## Steps of loading markdown

1. Create xxx.stories.js under the target folder.

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

## Steps of loading javascript with markdown

When you not only like to load js components, but also show notes in control panel.

1. Create xxx.stories.js under the target folder.

```js
import { loadJSWithNotesStories } from 'storybook-loader';

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

## Instructions

### **parameter**

| No.   | Parameter | Required | Type | Default | Description |
|:------|:---------:|:--------:|:----:|:--------|:------------|
| 1 | requireContext | 〇 | object / object list |  | instance of require.context OR an object return the same architecture to require.context |
| 2 | options | | object | ```{ groupByFolder: true, folderNameWhenEmpty: 'ALL' }``` | *see options below for more details |
| 3 | thirdParamMakerOptions |  | object | ```{ loader: mdLoader, formatter: formatWithNotesObject }``` | *see options below for more details |

### **options**

* storySubFuncList

    * Default: []

    * Description: list of sub functions in storiesOf to call

    * Attention: parameters of sub function MUST be an array

    * Example:
      
          -- NO.1 --------------------------------------------------------
          storySubFuncList: [ 
            'subFunc1',
            [ 'addDecorator', [withNotes] ],
            [ 'addParameters', [{ options: { showAddonPanel: false } }] ],
          ]
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          stories.subFunc1();
          stories.addDecorator(withNotes);
          stories.addParameters({ options: { showAddonPanel: false } });

* contentFuncList

    * Default: [ ramda.identity ] 

    * Description: list of pure functions for decorating file's contents. It's useful when you want to apply hocs(High Order Component) or hofs(High Order Function) to your content like withMUITheme, withLayout...

    * Attention: functions will receive ONLY ONE parameter -- the contents (could be string or React.Component). If function has more than one parameters, you can use util.unaryFunc to apply the rest parameters and then pass it to contentFuncList.

    * Example:

          -- NO.1 --------------------------------------------------------
          function decPrefixMsg(content, msg) {
            return `${msg}: ${content}`;
          }

          contentFuncList: [ 
            util.unaryFunc(decPrefixMsg, ['MyMessage is']),
          ]
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          stories.add(fileName, decPrefixMsg(content, 'MyMessage is'));

          -- NO.2 --------------------------------------------------------
          contentFuncList: [ 
            withMUITheme,
            withLayout,
          ]
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          stories.add(fileName, withLayout(withMUITheme(content)));

* hierarchyRoot

    * Default: ''

    * Description: prefix of stories' name. If you've enabled [hierarchyRootSeparator](https://github.com/storybooks/storybook/tree/next/addons/options#set-options-globally), xxx| will be the name of hierarchyRoot.

    * Example:
      
          -- NO.1 --------------------------------------------------------
          hierarchyRoot: 'Components|'
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          storiesOf('Components|' + folderName, module);

* groupByFolder

    * Default: true

    * Description: use folder name as the root stories' name.

    * Attention: If you set groupByFolder to false, all stories will be added to ONE root named by folderNameWhenEmpty(default is ALL).

    * Example:
      
          -- NO.1 --------------------------------------------------------
          groupByFolder: true

          /Button/Pattern1.js
          /Button/Pattern2.js
          /TextField/Pattern1.js
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          Button
            - Pattern1
            - Pattern2
          TextField
            - Pattern1
            
          -- NO.2 --------------------------------------------------------
          groupByFolder: false

          /Button/Pattern1.js
          /Button/Pattern2.js
          /TextField/Pattern1.js
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          ALL
            - Pattern1 (the second Pattern1 will be ignored)
            - Pattern2

* thirdParamMaker

    * Default: null

    * Description: function to make 3rd parameter of stories.add(xx, xx, 3rdParam). 
    thirdParamMaker(instance of require.context, filePath).

    * Attention: this function is called after every single file is loaded.

    * Example: [createMdThirdParamMaker](/src/plugin/createMdThirdParamMaker.js)

* sort

    * Default: true

    * Description: sort files by filename.

* sortFunc

    * Default: (a, b) => a.localeCompare(b)

    * Description: sort function. sort by files asc as default.

* noExt

    * Default: true

    * Description: display filename in menu without extention.

    * Example:
      
          -- NO.1 --------------------------------------------------------
          noExt: true

          /Button/Pattern1.js
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          Button
            - Pattern1
            
          -- NO.2 --------------------------------------------------------
          noExt: false

          /Button/Pattern1.js
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          Button
            - Pattern1.js

* noExtRegExp

    * Default: null

    * Description: remove extention regexp.

    * Attention: if noExt is true, will use noExtRegExp > includeRegExp > regExpFromRequireContext.

    * Example: /\\.md$/ to remove markdown's extention

* includeRegExp
    * Default: null

    * Description: regexp for include files by file name.

    * Attention: will use includeRegExp > regExpFromRequireContext.

    * Example: /\\.md$/ to add *.md files only.
    
* excludeRegExp
    * Default: null

    * Description: regexp for exclude files by file name.

    * Example: /\\.stories.js$/ to exclude all *.stories.js.
     
* ignoreDotFolder
    * Default: true

    * Description: ignore files under root folder (. folder)

    * Example: 
          -- NO.1 --------------------------------------------------------
          ignoreDotFolder: true

          ./Pattern1.js
          /Button/Pattern1.js
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          Button
            - Pattern1
    
          -- NO.2 --------------------------------------------------------
          ignoreDotFolder: false

          ./Pattern1.js
          /Button/Pattern1.js
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          .
            - Pattern1
          Button
            - Pattern1

## License

This project is licensed under the terms of the
[MIT license](/LICENSE).
