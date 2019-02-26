import loadJSStories from 'src/loadJSStories';

import loadStories from 'core/loadStories';
import jsLoader from 'plugin/jsLoader';

jest.mock('core/loadStories');
jest.mock('plugin/jsLoader');

beforeEach(() => {
  jest.resetAllMocks();
});

const requireContext = { keys: [] };

test('check when no options set', () => {
  loadJSStories(requireContext);

  const calledParams = loadStories.mock.calls[0];

  expect(calledParams[0]).toEqual(jsLoader);
  expect(calledParams[1]).toEqual(requireContext);
  expect(calledParams[2]).toEqual({});
  expect(calledParams[3]).toEqual(true);
  expect(loadStories.mock.calls[0].length).toEqual(4);
});

test('override default options', () => {
  const options = {
    includeRegExp: /include/,
    excludeRegExp: /exclude/,
  };
  loadJSStories(requireContext, options);

  const calledParams = loadStories.mock.calls[0];

  expect(calledParams[0]).toEqual(jsLoader);
  expect(calledParams[1]).toEqual(requireContext);
  expect(calledParams[2]).toEqual(options);
  expect(calledParams[3]).toEqual(true);
  expect(loadStories.mock.calls[0].length).toEqual(4);
});
