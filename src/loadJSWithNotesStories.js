import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';
import createMDThirdParamMaker from './plugin/createMDThirdParamMaker';

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
function loadJSWithNotesStories(
  requireContext,
  loadStoriesOptions = {},
  thirdParamMakerOptions = {},
) {
  const thirdParamMaker = createMDThirdParamMaker(thirdParamMakerOptions);
  loadStories(jsLoader, requireContext, { ...loadStoriesOptions, thirdParamMaker }, true);
}

export default loadJSWithNotesStories;
