import loader from 'core/loader';

import { reqWithNoRegexp, reqWithRegExp, reqWithRootFolder } from 'test/mocks/reqMock';

function checkObjWithKeysOrderSentitive(
  result,
  expectedResult,
  objectIsSame = true,
  keysOrderIsSame = true,
) {
  const baseObjectExpector = objectIsSame ? expect(result) : expect(result).not;
  baseObjectExpector.toEqual(expectedResult);

  const baseKeysOrderExpector = keysOrderIsSame
    ? expect(Object.keys(result))
    : expect(Object.keys(result)).not;
  baseKeysOrderExpector.toEqual(Object.keys(expectedResult));
}

describe('[options]sort, sortFunc', () => {
  test('sort true, customize sortFunc', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      sort: true,
      sortFunc: (a, b) => b.localeCompare(a),
    });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult, true, false);
  });

  test('sort false, customize sortFunc', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      sort: false,
      sortFunc: (a, b) => b.localeCompare(a),
    });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('sort true, default sortFunc', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      sort: false,
      sortFunc: (a, b) => b.localeCompare(a),
    });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });
});

describe('[options]noExt, noExtRegExp', () => {
  test('noExt true, no noExtRegExp, includeRegExp is \\.md$: [use includeRegExp instead]', () => {
    const result = loader(reqWithNoRegexp, { includeRegExp: /\.md$/i, noExt: true });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('noExt true, noExtRegExp is .md$, includeRegExp is mdfile: [use noExtRegExp to retreive extention]', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /mdfile/,
      noExt: true,
      noExtRegExp: /.md$/i,
    });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('noExt false, noExtRegExp is .md$, includeRegExp is mdfile: [extention will remain]', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /mdfile/,
      noExt: false,
      noExtRegExp: /.md$/i,
    });
    const expectResult = reqWithNoRegexp.resultMdWithExt;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });
});

describe('[options]includeRegExp', () => {
  test('correct includeRegExp', () => {
    const result = loader(reqWithNoRegexp, { includeRegExp: /\.md$/i });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('wrong includeRegExp', () => {
    const result = loader(reqWithNoRegexp, { includeRegExp: /\.aaa$/i });

    expect(result).toEqual({});
  });
});

describe('[options]excludeRegExp', () => {
  test('excludeRegExp not set', () => {
    const result = loader(reqWithNoRegexp, { includeRegExp: /\.md$/i });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('correct excludeRegExp -- exclude file', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      excludeRegExp: /file2/,
    });
    const expectResult = Object.keys(reqWithNoRegexp.resultMd).reduce((baseObj, key) => {
      if (!/file2/.test(key)) {
        baseObj[key] = reqWithNoRegexp.resultMd[key];
      }
      return baseObj;
    }, {});

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('correct excludeRegExp -- exclude folder', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      excludeRegExp: /sub1/,
    });
    const expectResult = Object.keys(reqWithNoRegexp.resultMd).reduce((baseObj, key) => {
      if (!/sub1/.test(key)) {
        baseObj[key] = reqWithNoRegexp.resultMd[key];
      }
      return baseObj;
    }, {});

    checkObjWithKeysOrderSentitive(result, expectResult);
  });
});

describe('[options]groupByFolder', () => {
  test('groupFolder is true', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      groupByFolder: true,
    });
    const expectResult = reqWithNoRegexp.resultMdGroup;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('groupFolder is false', () => {
    const result = loader(reqWithNoRegexp, {
      includeRegExp: /\.md$/i,
      groupByFolder: false,
    });
    const expectResult = reqWithNoRegexp.resultMd;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });
});

describe('[options]ignoreDotFolder', () => {
  test('ignoreDotFolder is true', () => {
    const result = loader(reqWithRootFolder, {
      includeRegExp: /\.md$/i,
      ignoreDotFolder: true,
    });
    const expectResult = reqWithRootFolder.resultIgnoreDotFolder;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('ignoreDotFolder is false', () => {
    const result = loader(reqWithRootFolder, {
      includeRegExp: /\.md$/i,
      ignoreDotFolder: false,
    });
    const expectResult = reqWithRootFolder.result;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });
});

describe('other tests', () => {
  test('no options, return all', () => {
    const result = loader(reqWithNoRegexp);
    const expectResult = reqWithNoRegexp.resultNoFilter;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('pass regexp \\.md$ to require.context, noExt true', () => {
    const result = loader(reqWithRegExp, { noExt: true });
    const expectResult = reqWithRegExp.result;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });

  test('pass regexp \\.md$ to require.context, noExt false', () => {
    const result = loader(reqWithRegExp, { noExt: false });
    const expectResult = reqWithRegExp.resultWithExt;

    checkObjWithKeysOrderSentitive(result, expectResult);
  });
});
