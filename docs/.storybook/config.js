import { addParameters, configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';

// Options
addParameters({
  options: {
    brandTitle: 'storybook-loader-docs',
    brandUrl: 'https://github.com/thundermiracle/storybook-loader',
  }
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /.stories.js$/);
function loadStories() {
  req.keys().sort().forEach(filename => req(filename));
}

configure(loadStories, module);
