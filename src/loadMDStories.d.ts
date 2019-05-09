import { loadStoriesOptions } from './core/loadStories';

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
export default function loadMDStories(
  requireContext: any,
  loadStoriesOptions: loadStoriesOptions,
): void;
