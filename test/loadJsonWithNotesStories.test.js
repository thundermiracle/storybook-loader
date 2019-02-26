import loadJsonWithNotesStories from 'src/loadJsonWithNotesStories';

import loadStories from 'core/loadStories';
import jsonLoader from 'plugin/jsonLoader';
import createMDThirdParamMaker from 'plugin/createMDThirdParamMaker';

jest.mock('core/loadStories');
jest.mock('plugin/jsonLoader');
jest.mock('plugin/createMDThirdParamMaker');

beforeEach(() => {
  jest.resetAllMocks();
});

const requireContext = { keys: [] };

test('check when no options set', () => {
  loadJsonWithNotesStories(requireContext);

  expect(createMDThirdParamMaker).toHaveBeenCalledTimes(1);
  expect(createMDThirdParamMaker.mock.calls[0][0]).toEqual({});

  const calledParams = loadStories.mock.calls[0];
  expect(calledParams[0]).toEqual(jsonLoader);
  expect(calledParams[1]).toEqual(requireContext);
  expect(calledParams[2]).toEqual({ thirdParamMaker: undefined });
  expect(calledParams[3]).toEqual(true);
  expect(loadStories.mock.calls[0].length).toEqual(4);
});

test('override default options', () => {
  const userOptions = {
    includeRegExp: /include/,
    excludeRegExp: /exclude/,
  };
  const thirdParamOptions = {
    loader: jsonLoader,
  };
  loadJsonWithNotesStories(requireContext, userOptions, thirdParamOptions);

  expect(createMDThirdParamMaker).toHaveBeenCalledTimes(1);
  expect(createMDThirdParamMaker.mock.calls[0][0]).toEqual(thirdParamOptions);

  const calledParams = loadStories.mock.calls[0];
  expect(calledParams[0]).toEqual(jsonLoader);
  expect(calledParams[1]).toEqual(requireContext);
  expect(calledParams[2]).toEqual({ ...userOptions, thirdParamMaker: undefined });
  expect(calledParams[3]).toEqual(true);
  expect(loadStories.mock.calls[0].length).toEqual(4);
});

test('cannot set thirdParamMaker by userOptions', () => {
  const userOptions = {
    includeRegExp: /include/,
    excludeRegExp: /exclude/,
    thirdParamMaker: 'outterThirdParamMaker',
  };
  loadJsonWithNotesStories(requireContext, userOptions);

  expect(loadStories.mock.calls[0][2]).toEqual({ ...userOptions, thirdParamMaker: undefined });
});
