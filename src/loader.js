import * as R from 'ramda';
import {
  basename, foldername, getRegExpFromRequireContext, isRightExt,
} from './util';

const defaultOptions = {
  sort: true,
  sortFunc: (a, b) => a - b,
  noExt: true,
  noExtRegExp: null,
  groupByFolder: false,
  forceFilterExt: false,
};

const allExtRegExp = /\.[0-9a-z]+$/i;

/**
 * Return the list of file name and file content(by require) from a directory.
 * Content can be a string if you load *.json, *.md, and can be object or function if you load *.js, *.jsx
 * @example { NameOfMyComponent:  SrcOfMyComponent }
 * @example { folder1: { NameOfComponent1:  SrcOfComponent1, NameOfComponent2: SrcOfComponent2 },
 * folder2: { Component3: SrcOfComponent3} }
 *
 * @param {*require.context} req webpack's require.context
 * @param {*object} userOptions optionally,
 */
function loader(req, userOptions = {}) {
  const {
    sort, sortFunc, noExt, noExtRegExp, groupByFolder, forceFilterExt,
  } = {
    ...defaultOptions,
    ...userOptions,
  };

  // try get regexp from req
  const extRegExp = noExtRegExp || getRegExpFromRequireContext(req) || allExtRegExp;

  // use requirecontext to read contents of the file
  function fileContentReducer(baseObj, filePath) {
    if (forceFilterExt && !isRightExt(filePath, extRegExp)) {
      // skip if extention doesn't match regexp
      return baseObj;
    }

    const fileName = basename(filePath, noExt ? extRegExp : null);
    if (!groupByFolder) {
      baseObj[fileName] = req(filePath);
    } else {
      // add folder layer
      const folderName = foldername(filePath);
      baseObj[folderName] = {
        ...baseObj[folderName],
        [fileName]: req(filePath),
      };
    }
    return baseObj;
  }

  return R.compose(
    R.reduce(fileContentReducer, {}),
    R.sort(sort ? sortFunc : R.identity),
  )(req.keys());
}

export default loader;
