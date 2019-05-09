import { loadStoriesOptions } from './core/loadStories';
import { thirdParamOptions } from './plugin/createMDThirdParamMaker';

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
export default function loadJsonWithNotesStories(
  requireContext: any,
  loadStoriesOptions?: loadStoriesOptions,
  thirdParamMakerOptions?: thirdParamOptions,
): void;
