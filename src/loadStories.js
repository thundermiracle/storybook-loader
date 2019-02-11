import { storiesOf } from '@storybook/react';
import { identity } from 'ramda';
import {
  applySubFuncs, flattenContentObj, getComponent, applyFuncList,
} from './util';

const mdDefaultOptions = {
  storySubFuncList: [],
  hierarchyRoot: '',
  contentFuncList: [
    {
      func: identity,
    },
  ],
  groupByFolder: true,
};

function loadStories(loader, reqList = [], userOptions = {}, isContentComponent = false) {
  const {
    storySubFuncList, hierarchyRoot, contentFuncList, ...loaderOptions
  } = {
    ...mdDefaultOptions,
    ...userOptions,
  };

  const { groupByFolder } = loaderOptions;

  reqList.forEach((req) => {
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
        if (!isContentComponent) {
          secondParam = applyFuncList(fileContent, contentFuncList);
        } else {
          const Component = applyFuncList(getComponent(fileContent), contentFuncList);
          // eslint-disable-next-line react/display-name
          secondParam = () => <Component />;
        }
        stories.add(fileName, secondParam);
      });
    });
  });
}

export default loadStories;
