import loadStories from './core/loadStories';
import jsonLoader from './plugin/jsonLoader';
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
function loadJsonWithNotesStories(
  requireContext,
  loadStoriesOptions = {},
  thirdParamMakerOptions = {},
) {
  const thirdParamMaker = createMDThirdParamMaker(thirdParamMakerOptions);
  loadStories(
    jsonLoader,
    requireContext,
    { ...loadStoriesOptions, thirdParamMaker },
    true,
  );
}

export default loadJsonWithNotesStories;
