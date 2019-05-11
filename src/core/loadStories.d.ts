import { loaderOptions } from './loader';
import { FunctionListElement } from './lib/util';

interface loadStoriesExtraOptions {
  storySubFuncList?: FunctionListElement[];
  contentFuncList?: Function[];
  hierarchyRoot?: string;
  groupByFolder?: boolean;
  folderNameWhenEmpty?: string;
  thirdParamMaker?: Function;
  dotFolderName?: string;
}

type loadStoriesOptions = loadStoriesExtraOptions & loaderOptions;

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
 * @default
 * isContentAComponent: false
 */
declare function loadStories(
  loader: Function,
  requireContext: any,
  loadStoriesOptions: loadStoriesOptions,
  isContentAComponent: boolean,
): void;

export { loadStories as default, loadStoriesOptions };
