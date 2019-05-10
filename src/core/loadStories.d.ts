import { loaderOptions } from './loader';

interface loadStoriesExtraOptions {
  storySubFuncList?: Function[];
  contentFuncList?: Function[];
  hierarchyRoot?: string;
  groupByFolder?: boolean;
  folderNameWhenEmpty?: string;
  thirdParamMaker?: Function;
  dotFolderName?: string;
}

export type loadStoriesOptions = loadStoriesExtraOptions & loaderOptions;

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
 * @default
 * isContentAComponent: false
 */
export default function loadStories(
  loader: Function,
  requestContext: any,
  loadStoriesOptions: loadStoriesOptions,
  isContentAComponent: boolean,
): void;
