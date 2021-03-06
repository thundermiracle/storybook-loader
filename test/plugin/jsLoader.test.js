import jsLoader from 'plugin/jsLoader';
import loader from 'core/loader';

jest.mock('core/loader');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('default options', () => {
  const defIncludeStr = '/\\.jsx?$/i';
  const defExcludeStr = '/\\.stories.js$/i';

  test('check when no options set', () => {
    jsLoader(null);

    const calledOpt = loader.mock.calls[0][1];

    expect(calledOpt.includeRegExp.toString()).toEqual(defIncludeStr);
    expect(calledOpt.excludeRegExp.toString()).toEqual(defExcludeStr);
  });

  test('override default options', () => {
    const options = {
      includeRegExp: /include/,
      excludeRegExp: /exclude/,
    };
    jsLoader(null, options);

    const calledOpt = loader.mock.calls[0][1];

    expect(calledOpt.includeRegExp.toString()).not.toEqual(defIncludeStr);
    expect(calledOpt.excludeRegExp.toString()).not.toEqual(defExcludeStr);
    expect(calledOpt.includeRegExp.toString()).toEqual(options.includeRegExp.toString());
    expect(calledOpt.excludeRegExp.toString()).toEqual(options.excludeRegExp.toString());
  });
});
