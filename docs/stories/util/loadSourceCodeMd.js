import { loadMDStories } from 'storybook-loader';
import { doc } from 'storybook-readme';

const options = {
  contentFuncList: [
    doc,
  ],
  ignoreDotFolder: false,
  dotFolderName: '',
  storySubFuncList: [
    [
      'addParameters',
      [{ options: { showPanel: false } }],
    ],
  ],
};

export default function loadSourceCodeMd(req, userOptions = {}) {
  loadMDStories(req, { ...options, ...userOptions });
}
