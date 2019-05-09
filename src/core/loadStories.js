import { storiesOf } from '@storybook/react';
import { identity } from 'ramda';
import {
  applySubFuncs,
  flattenContentObj,
  getComponent,
  applyFuncList,
  toList,
  toReact,
} from './lib/util';

const mdDefaultOptions = {
  storySubFuncList: [],
  contentFuncList: [identity],
  hierarchyRoot: '',
  groupByFolder: true,
  folderNameWhenEmpty: 'ALL',
  thirdParamMaker: null,
  dotFolderName: '.',
};

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
function loadStories(
  loader,
  requireContext,
  loadStoriesOptions = {},
  isContentAComponent = false,
) {
  const {
    storySubFuncList,
    hierarchyRoot,
    contentFuncList,
    folderNameWhenEmpty,
    thirdParamMaker,
    dotFolderName,
    ...loaderOptions
  } = {
    ...mdDefaultOptions,
    ...loadStoriesOptions,
  };

  const { groupByFolder } = loaderOptions;

  toList(requireContext).forEach(req => {
    // read files' contents
    const contentObj = loader(req, loaderOptions);

    // flatten folder layer
    const folderBaseContentList = flattenContentObj(contentObj, groupByFolder);

    folderBaseContentList.forEach(([folderName, contentList]) => {
      let subFolderName = folderName;
      if (subFolderName === '') {
        subFolderName = folderNameWhenEmpty;
      } else if (subFolderName === '.') {
        subFolderName = dotFolderName;
      }

      const stories = storiesOf(`${hierarchyRoot}${subFolderName}`, module);

      // apply option functions of storybook
      applySubFuncs(stories, storySubFuncList);

      contentList.forEach(([filePath, [fileName, fileContent]]) => {
        let secondParam;
        if (!isContentAComponent) {
          secondParam = applyFuncList(fileContent, contentFuncList);
        } else {
          const Component = applyFuncList(getComponent(fileContent), contentFuncList);
          secondParam = toReact(Component);
        }

        let thirdParam;
        if (thirdParamMaker) {
          thirdParam = thirdParamMaker(req, filePath);
        }
        stories.add(fileName, secondParam, thirdParam);
      });
    });
  });
}

export default loadStories;
