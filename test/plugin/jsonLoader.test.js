import jsonLoader from 'plugin/jsonLoader';
import loader from 'core/loader';

jest.mock('core/loader');

beforeEach(() => {
  jest.resetAllMocks();
});

describe('default options', () => {
  const defIncludeStr = '/\\.json$/i';

  test('check when no options set', () => {
    jsonLoader(null);

    const calledOpt = loader.mock.calls[0][1];

    expect(calledOpt.includeRegExp.toString()).toEqual(defIncludeStr);
    expect(calledOpt.excludeRegExp).toBeUndefined();
  });

  test('override default options', () => {
    const options = {
      includeRegExp: /include/,
      excludeRegExp: /exclude/,
    };
    jsonLoader(null, options);

    const calledOpt = loader.mock.calls[0][1];

    expect(calledOpt.includeRegExp.toString()).not.toEqual(defIncludeStr);
    expect(calledOpt.includeRegExp.toString()).toEqual(options.includeRegExp.toString());
    expect(calledOpt.excludeRegExp.toString()).toEqual(options.excludeRegExp.toString());
  });
});
