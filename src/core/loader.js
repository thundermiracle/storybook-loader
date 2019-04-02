import * as R from 'ramda';
import {
  basename,
  foldername,
  getRegExpFromRequireContext,
  isFilePathCorrect,
  isRequireContextRegExpPassed,
} from './lib/util';

const defaultOptions = {
  sort: true,
  sortFunc: (a, b) => a.localeCompare(b),
  noExt: true,
  noExtRegExp: null,
  includeRegExp: null,
  excludeRegExp: null,
  groupByFolder: false,
  ignoreDotFolder: true,
};

/**
 * Return the list of file name and file content(by require) from a directory.
 * Content can be a string if you load *.json, *.md, or can be an object or function if you load *.js, *.jsx
 * @example return { path(without extention):  [NameOfMyComponent, SrcOfMyComponent] }
 * @example { folder1: { path1: [NameOfComponent1, SrcOfComponent1], path2: [NameOfComponent2, SrcOfComponent2] },
 * folder2: { path3: [FileNameComponent3, SrcOfComponent3]} }
 *
 * @param {*require.context} req webpack's require.context
 * @param {*object} userOptions optionally,
 */
function loader(req, userOptions = {}) {
  const {
    sort,
    sortFunc,
    noExt,
    noExtRegExp,
    includeRegExp,
    excludeRegExp: fileExcludeRegExp,
    groupByFolder,
    ignoreDotFolder,
  } = {
    ...defaultOptions,
    ...userOptions,
  };

  // try get regexp from req
  let regExpFromReq;
  if (isRequireContextRegExpPassed(req)) {
    // ignore default regexp
    regExpFromReq = getRegExpFromRequireContext(req);
  }
  const fileIncludeRegExp = includeRegExp || regExpFromReq;

  // use requirecontext to read contents of the file
  function fileContentReducer(baseObj, filePath) {
    if (!isFilePathCorrect(filePath, fileIncludeRegExp, fileExcludeRegExp)) {
      // skip if extention doesn't match regexp
      return baseObj;
    }

    const fileName = basename(filePath, noExt ? noExtRegExp || fileIncludeRegExp : null);
    const folderName = foldername(filePath);
    const key = `${folderName}/${fileName}`;

    // add folder layer
    if (ignoreDotFolder && folderName === '.') {
      return baseObj;
    }

    if (!groupByFolder) {
      baseObj[key] = [fileName, req(filePath)];
    } else {
      baseObj[folderName] = {
        ...baseObj[folderName],
        [key]: [fileName, req(filePath)],
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
