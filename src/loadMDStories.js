import loadStories from './core/loadStories';
import mdLoader from './plugin/mdLoader';

/**
 * @default
 * loadStoriesOptions: {
 *   sort: true,
 *   sortFunc: (a, b) => a.localeCompare(b),
 *   noExt: true,
 *   groupByFolder: true,
 *   ignoreDotFolder: true,
 *   hierarchyRoot: '',
 *   folderNameWhenEmpty: 'ALL',
 *   dotFolderName: '.',
 * }
 */
function loadMDStories(requireContext, loadStoriesOptions = {}) {
  loadStories(mdLoader, requireContext, loadStoriesOptions);
}

export default loadMDStories;
