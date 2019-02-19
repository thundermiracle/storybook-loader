/* eslint-disable no-plusplus */
import { identity } from 'ramda';

import loadStories from 'core/loadStories';

import { storiesOf } from '@storybook/react';
import * as Util from 'core/lib/util';
import mdLoader from 'src/plugin/mdLoader';

import { reqWithRegExp } from 'test/mocks/reqMock';

jest.mock('@storybook/react');

// mock of story.add
const addMock = jest.fn();
beforeEach(() => {
  jest.resetAllMocks();

  jest.spyOn(Util, 'applySubFuncs');
  jest.spyOn(Util, 'applyFuncList');
  jest.spyOn(Util, 'getComponent');
  jest.spyOn(Util, 'toReact');

  storiesOf.mockImplementation(() => ({
    add: addMock,
  }));
});

describe('[options]storySubFuncList', () => {
  test('storySubFuncList is empty', () => {
    loadStories(mdLoader, reqWithRegExp);

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(Util.applySubFuncs.mock.calls[index][1]).toEqual([]);
    }
  });

  test('storySubFuncList is array', () => {
    loadStories(mdLoader, reqWithRegExp, { storySubFuncList: ['addParameters'] });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(Util.applySubFuncs.mock.calls[index][1]).toEqual(['addParameters']);
    }
  });
});

describe('[options]hierarchyRoot', () => {
  test('hierarchyRoot is empty', () => {
    loadStories(mdLoader, reqWithRegExp, { hierarchyRoot: '', groupByFolder: false });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(storiesOf.mock.calls[index][0]).toEqual('');
    }
  });

  test('hierarchyRoot have value', () => {
    loadStories(mdLoader, reqWithRegExp, { hierarchyRoot: 'category|', groupByFolder: false });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(storiesOf.mock.calls[index][0]).toEqual('category|');
    }
  });
});

describe('[options]contentFuncList', () => {
  test('contentFuncList is not set', () => {
    loadStories(mdLoader, reqWithRegExp);

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(Util.applyFuncList.mock.calls[index][1]).toEqual([identity]);
    }
  });

  test('contentFuncList is empty', () => {
    loadStories(mdLoader, reqWithRegExp, { contentFuncList: [] });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(Util.applyFuncList.mock.calls[index][1]).toEqual([]);
    }
  });

  test('contentFuncList is array', () => {
    const func1 = jest.fn();
    const func2 = jest.fn();
    loadStories(mdLoader, reqWithRegExp, { contentFuncList: [func1, func2] });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(Util.applyFuncList.mock.calls[index][1]).toEqual([func1, func2]);
    }
  });
});

describe('[options]groupByFolder', () => {
  test('groupByFolder is true', () => {
    loadStories(mdLoader, reqWithRegExp, { groupByFolder: true, hierarchyRoot: '' });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(storiesOf.mock.calls[index][0]).toEqual(Util.foldername(reqWithRegExp.keys()[index]));
    }
  });

  test('groupByFolder is false', () => {
    loadStories(mdLoader, reqWithRegExp, { groupByFolder: false, hierarchyRoot: '' });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(storiesOf.mock.calls[index][0]).toEqual('');
    }
  });
});

describe('[options]thirdParamMaker', () => {
  test('thirdParamMaker is null', () => {
    loadStories(mdLoader, reqWithRegExp, { thirdParamMaker: null });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      expect(addMock.mock.calls[index][2]).toBeUndefined();
    }
  });

  test('groupByFolder is false', () => {
    const paramMakerMock = jest.fn().mockReturnValue('thirdvalue');
    loadStories(mdLoader, reqWithRegExp, { thirdParamMaker: paramMakerMock });

    for (let index = 0; index < reqWithRegExp.length; index++) {
      const filePath = Object.keys(reqWithRegExp.result)[index];

      expect(paramMakerMock).toHaveBeenCalledWith(reqWithRegExp, filePath);
      expect(addMock.mock.calls[index][2]).toEqual('thirdvalue');
    }
  });
});

describe('isContentAComponent', () => {
  test('isContentAComponent is false: content is text', () => {
    loadStories(mdLoader, reqWithRegExp, {}, false);

    const count = reqWithRegExp.keys().length;
    expect(Util.applyFuncList).toHaveBeenCalledTimes(count);
    expect(Util.getComponent).toHaveBeenCalledTimes(0);
  });

  test('isContentAComponent is true: content is component', () => {
    loadStories(mdLoader, reqWithRegExp, {}, true);

    const count = reqWithRegExp.keys().length;
    expect(Util.applyFuncList).toHaveBeenCalledTimes(count);
    expect(Util.getComponent).toHaveBeenCalledTimes(count);
    expect(Util.toReact).toHaveBeenCalledTimes(count);
  });
});
