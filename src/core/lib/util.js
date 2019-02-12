import path from 'path';
import {
  toPairs, __, pipe, curry,
} from 'ramda';
import log from 'loglevel';

const allExtRegExp = /\.[0-9a-z]+$/i;

/**
 * Return the basename of the file
 *
 * @param p the path to evaluate
 * @param regExp optionally, regex for remove
 */
function basename(filePath, regExp = null) {
  let fileName = path.basename(filePath);
  if (regExp) {
    fileName = fileName.replace(regExp, '');
  }
  return fileName;
}

/**
 * Return the folder name.
 * If folder is relative, dot will be retrieved.
 * @example ./path.1/path2/filename  =>  path.1/path2
 * @example /path.1/path2/filename  =>  path.1/path2
 *
 * @param p the path to evaluate
 */
function foldername(filePath) {
  return path.dirname(filePath).replace(/^.\//, '');
}

function getRegExpStrFromRequireContext(req) {
  const id = req.id;
  if (id == null) {
    return null;
  }

  const regExpStr = id.split(' ').pop();
  if (regExpStr == null || regExpStr === '') {
    return null;
  }

  return regExpStr;
}

/**
 * Return RegExp string in require.context instance
 *
 * @param {*require.context} req webpack's require.context instance
 */
function getRegExpFromRequireContext(req) {
  const regExpStr = getRegExpStrFromRequireContext(req);

  return regExpStr || new RegExp(regExpStr);
}

/**
 * Return whether regexp is passed to require.context or not.
 *
 * @param {*require.context} req webpack's require.context instance
 */
function isRequireContextRegExpPassed(req) {
  return getRegExpStrFromRequireContext(req) !== '^\\.\\/.*$';
}

/**
 * Return true if file's extention match RegExp
 *
 * @param {*string} filePath
 * @param {*RegExp} regExp
 */
function isFileNameCorrect(filePath, includeRegExp, excludeRegExp = null) {
  const fileName = path.basename(filePath);
  return (includeRegExp || allExtRegExp).test(fileName) && (excludeRegExp == null ? true : !excludeRegExp.test(fileName));
}

/**
 * Apply all functions in funcObj to baseObj.
 * @example funcObj: [{ func: "func1", params: [ param1, param2 ] }, { func: "func2", params: [param1] }];
 * will call -- baseObj.func1(param1, param2) -> baseObj.func2(param1);
 *
 * @param {*instance} baseObj main function
 * @param {*object} funcObj sub function object
 */
function applySubFuncs(baseObj, funcObjList) {
  funcObjList.forEach(({ func, params }) => {
    // skip if params if not array
    if (!Array.isArray(params)) {
      log.warn('funcObjList\'s params MUST be an array!');
      return;
    }
    baseObj[func](...params);
  });
}

/**
 * Return flattened array of contentObj
 * @example { a1: '111', b1: '222' }  ->  [['', [['a1', '111'], ['b1', '222']]]
 * @example { fa: { a1: '111', a2: '112'}, fb: { b1: '222'}}  ->  [['fa', [['a1', '111'], ['a2', '112']], ['fb', [['b1', '222']]]]
 *
 * @param contentObj object of filecontents loaded by loader.js
 * @param containGroupFolder boolean
 */
function flattenContentObj(contentObj, containGroupFolder = false) {
  // flatten folder layer
  let folderBaseContentList;
  if (containGroupFolder) {
    folderBaseContentList = toPairs(contentObj)
      .map(([folderName, fileContentObj]) => ([folderName, toPairs(fileContentObj)]));
  } else {
    // if folder layer is not exist, add a space folder
    folderBaseContentList = [
      ['', toPairs(contentObj)],
    ];
  }

  return folderBaseContentList;
}

/**
 * Return react Component(function) from fileContent
 *
 * @param fileContent instance of require.context(fileName)
 */
function getComponent(fileContent) {
  if (typeof fileContent === 'object' && typeof fileContent.default === 'function') {
    return fileContent.default;
  }
  return fileContent;
}

/**
 * Return composed purefunction and skip setting the first parameter
 *
 * @param funcList
 */
function composePureFuncSkipFirstParam(funcList) {
  const allFuncs = funcList.map(({ func, params }) => {
    if (params == null) {
      return func;
    }

    return curry(func)(__, ...params);
  });

  return pipe(...allFuncs);
}

/**
 * Return component applied all functions in funcList, funcList MUST be pure
 * @example funcList: [{ func: hoc1, params: [param2, param3] }, { func: hoc2, params: [param4] }]
 *  will return hoc2(hoc1(component, param2, param3), param4)
 *
 * @param component target Component
 * @param funcList function list
 */
function applyFuncList(component, funcList = []) {
  if (funcList.length === 0) {
    return component;
  }

  const composedFuncs = pipe(...funcList);

  return composedFuncs(component);
}

/**
 * Return new function with setting all params from second place.
 * @example (function myName(name, msg1, msg2) {}, params=['hello', 'world'])  =>
 *   myName(name, 'hello', 'world');
 *
 * @param func
 * @param params parameter array
 */
function unaryFunc(func, params = []) {
  if (params == null || params.length === 0) {
    return func;
  }

  return curry(func)(__, ...params);
}

export {
  basename, foldername, getRegExpFromRequireContext, isFileNameCorrect,
  applySubFuncs, isRequireContextRegExpPassed, flattenContentObj,
  getComponent, applyFuncList, unaryFunc, composePureFuncSkipFirstParam,
};
