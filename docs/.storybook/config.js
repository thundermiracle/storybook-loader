import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withOptions } from '@storybook/addon-options';

// Options
addDecorator(withOptions({
  name: 'storybook-loader-docs',
  url: 'https://github.com/thundermiracle/storybook-loader',
  hierarchyRootSeparator: /\|/,
}));

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
