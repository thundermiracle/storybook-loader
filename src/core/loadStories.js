import { storiesOf } from '@storybook/react';
import { identity } from 'ramda';
import {
  applySubFuncs, flattenContentObj, getComponent, applyFuncList, toList,
} from './lib/util';

const mdDefaultOptions = {
  storySubFuncList: [],
  hierarchyRoot: '',
  contentFuncList: [
    identity,
  ],
  groupByFolder: true,
  thirdParamMaker: null,
};

function loadStories(loader, requireContext, userOptions = {}, isContentAComponent = false) {
  const {
    storySubFuncList, hierarchyRoot, contentFuncList, thirdParamMaker,
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
      const stories = storiesOf(`${hierarchyRoot}${folderName}`, module);

      // apply option functions of storybook
      applySubFuncs(stories, storySubFuncList);

      contentList.forEach(([fileName, fileContent]) => {
        let secondParam;
        if (!isContentAComponent) {
          secondParam = applyFuncList(fileContent, contentFuncList);
        } else {
          const Component = applyFuncList(getComponent(fileContent), contentFuncList);
          // eslint-disable-next-line react/display-name
          secondParam = () => <Component />;
        }

        let thirdParam;
        if (thirdParamMaker) {
          thirdParam = thirdParamMaker(req, fileName);
        }
        stories.add(fileName, secondParam, thirdParam);
      });
    });
  });
}

export default loadStories;
