/* eslint-disable no-plusplus */
import createMDThirdParamMaker from 'plugin/createMDThirdParamMaker';
import mdLoader from 'plugin/mdLoader';

import { reqWithRegExp } from 'test/mocks/reqMock';

beforeEach(() => {
  jest.resetAllMocks();
});

test('check when no options set', () => {
  const thirdParamFunc = createMDThirdParamMaker();

  const keys = reqWithRegExp.keys().map(fullPath => fullPath.replace(/^.\//, '').replace(/.md$/, ''));
  for (let index = 0; index < keys.length; index++) {
    const result = thirdParamFunc(reqWithRegExp, keys[index]);
    expect(result).toEqual({
      notes: {
        markdown: reqWithRegExp.result[keys[index]][1],
      },
    });
  }

  // only called once because of cache
  // expect(mdLoader).toHaveBeenCalledTimes(1);
});

test('check file name is not exist', () => {
  const thirdParamFunc = createMDThirdParamMaker();

  const result = thirdParamFunc(reqWithRegExp, 'not exist');
  expect(result).toEqual({
    notes: {
      markdown: ' ',
    },
  });
});

test('customize formatter', () => {
  const thirdParamFunc = createMDThirdParamMaker({
    formatter(content) {
      return {
        notes: content,
      };
    },
  });

  const keys = reqWithRegExp.keys().map(fullPath => fullPath.replace(/^.\//, '').replace(/.md$/, ''));
  for (let index = 0; index < keys.length; index++) {
    const result = thirdParamFunc(reqWithRegExp, keys[index]);
    expect(result).toEqual({
      notes: reqWithRegExp.result[keys[index]][1],
    });
  }
});
