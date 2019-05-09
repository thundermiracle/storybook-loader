import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';

/**
 * @default
 * loadStoriesOptions: {
 * sort: true,
 * sortFunc: (a, b) => a.localeCompare(b),
 * noExt: true,
 * groupByFolder: true,
 * ignoreDotFolder: true,
 * hierarchyRoot: '',
 * folderNameWhenEmpty: 'ALL',
 * dotFolderName: '.',
 *}
 */
function loadJSStories(requireContext, loadStoriesOptions = {}) {
  loadStories(jsLoader, requireContext, loadStoriesOptions, true);
}

export default loadJSStories;
