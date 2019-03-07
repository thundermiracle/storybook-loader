#### hierarchyRoot

  * Default: ''

   * Description: prefix of stories' name. If you've enabled [hierarchyRootSeparator](https://github.com/storybooks/storybook/tree/next/addons/options#set-options-globally), xxx| will be the name of hierarchyRoot.

   * Example:

          -- NO.1 --------------------------------------------------------
          hierarchyRoot: 'Components|'
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          storiesOf('Components|' + folderName, module);
