import { storiesOf } from '@storybook/react';
import { identity } from 'ramda';
import {
  applySubFuncs, flattenContentObj, getComponent, applyFuncList, toList, toReact,
} from './lib/util';

const mdDefaultOptions = {
  storySubFuncList: [],
  contentFuncList: [
    identity,
  ],
  hierarchyRoot: '',
  groupByFolder: true,
  folderNameWhenEmpty: 'ALL',
  thirdParamMaker: null,
};

function loadStories(loader, requireContext, userOptions = {}, isContentAComponent = false) {
  const {
    storySubFuncList, hierarchyRoot, contentFuncList,
    folderNameWhenEmpty, thirdParamMaker,
    ...loaderOptions
  } = {
    ...mdDefaultOptions,
    ...userOptions,
  };

  const { groupByFolder } = loaderOptions;

  toList(requireContext).forEach((req) => {
    // read files' contents
    const contentObj = loader(req, loaderOptions);

    // flatten folder layer
    const folderBaseContentList = flattenContentObj(contentObj, groupByFolder);

    folderBaseContentList.forEach(([folderName, contentList]) => {
      const stories = storiesOf(`${hierarchyRoot}${folderName || folderNameWhenEmpty}`, module);

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
