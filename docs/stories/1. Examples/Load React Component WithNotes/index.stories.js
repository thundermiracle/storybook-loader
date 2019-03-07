import { loadJSWithNotesStories } from 'storybook-loader';
import { withNotes } from '@storybook/addon-notes';
import { withOptions } from '@storybook/addon-options';

import HierarchyRoot from '../../util/HierarchyRoot';

const req = require.context('./');
const options = {
  hierarchyRoot: HierarchyRoot.ReactComponentWithNotes,
  storySubFuncList: [
    [
      'addDecorator',
      [withNotes],
    ],
    [
      'addDecorator',
      [withOptions({
        name: 'storybook-loader-docs',
        url: 'https://github.com/thundermiracle/storybook-loader',
        hierarchyRootSeparator: /\|/,
        addonPanelInRight: true,
      })],
    ],
  ],
};

loadJSWithNotesStories(req, options);
