import loadMDStories from 'src/loadMDStories';

import loadStories from 'core/loadStories';
import mdLoader from 'plugin/mdLoader';

jest.mock('core/loadStories');
jest.mock('plugin/mdLoader');

beforeEach(() => {
  jest.resetAllMocks();
});

const requireContext = { keys: [] };

test('check when no options set', () => {
  loadMDStories(requireContext);

  const calledParams = loadStories.mock.calls[0];

  expect(calledParams[0]).toEqual(mdLoader);
  expect(calledParams[1]).toEqual(requireContext);
  expect(calledParams[2]).toEqual({});
  expect(loadStories.mock.calls[0].length).toEqual(3);
});

test('override default options', () => {
  const options = {
    includeRegExp: /include/,
    excludeRegExp: /exclude/,
  };
  loadMDStories(requireContext, options);

  const calledParams = loadStories.mock.calls[0];

  expect(calledParams[0]).toEqual(mdLoader);
  expect(calledParams[1]).toEqual(requireContext);
  expect(calledParams[2]).toEqual(options);
  expect(loadStories.mock.calls[0].length).toEqual(3);
});
