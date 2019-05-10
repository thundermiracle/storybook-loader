/* eslint-disable no-unused-expressions */
import path from 'path';
import { toPairs, __, pipe, curry } from 'ramda';

import log from './logger';

// const allExtRegExp = /\.[0-9a-z]+$/i;
const allExtRegExp = /(.*?)/;

/**
 * Return the basename of the file
 *
 * @param p the path to evaluate
 * @param regExpForRemove optionally, regex for remove
 */
function basename(filePath, regExpForRemove = null) {
  let fileName = path.basename(filePath);
  if (regExpForRemove) {
    fileName = fileName.replace(regExpForRemove, '');
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
  return path.dirname(filePath).replace(/^.?\//, '');
}

function getRegExpStrFromRequireContext(req) {
  const id = req.id;
  if (id == null || typeof id !== 'string') {
    return null;
  }

  const regExpStr = id.split(' ').pop();
  if (regExpStr === '') {
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

  return regExpStr != null ? new RegExp(regExpStr) : null;
}

/**
 * Return whether regexp is passed to require.context or not.
 *
 * @param {*require.context} req webpack's require.context instance
 */
function isRequireContextRegExpPassed(req) {
  const regExpFromReq = getRegExpStrFromRequireContext(req);
  return regExpFromReq != null && regExpFromReq !== '^\\.\\/.*$';
}

/**
 * Return true if file's name match RegExp
 *
 * @param {*string} filePath
 * @param {*RegExp} regExp
 */
function isFileNameCorrect(filePath, includeRegExp, excludeRegExp = null) {
  const fileName = path.basename(filePath);
  return (
    (includeRegExp || allExtRegExp).test(fileName) &&
    (excludeRegExp == null ? true : !excludeRegExp.test(fileName))
  );
}

/**
 * Return true if file's full path(include filename) match RegExp
 *
 * @param {*string} filePath
 * @param {*RegExp} regExp
 */
function isFilePathCorrect(filePath, includeRegExp, excludeRegExp = null) {
  return (
    (includeRegExp || allExtRegExp).test(filePath) &&
    (excludeRegExp == null ? true : !excludeRegExp.test(filePath))
  );
}

/**
 * Apply all functions in funcObj to baseObj.
 * @example funcList: [ "func1", ["func2"], ["func3", [ param1, param2 ]];
 * will call -- baseObj.func1() -> baseObj.func2() -> baseObj.func3(param1, param2);
 *
 * @param {*instance} baseObj main function
 * @param {*object} funcObj sub function object
 */
function applySubFuncs(baseObj, funcList = []) {
  funcList.forEach(funcInfo => {
    if (typeof funcInfo === 'string') {
      // only sub function
      baseObj[funcInfo] && baseObj[funcInfo]();
    } else {
      const [funcName, params] = funcInfo;
      if (params == null) {
        // run sub function without params
        baseObj[funcName] && baseObj[funcName]();
        return;
      }

      if (!Array.isArray(params)) {
        log.error(
          `function [${funcName}]'s parameters in storySubFuncList MUST be an array.`,
        );
        return;
      }

      baseObj[funcName] && baseObj[funcName](...params);
    }
  });
}

/**
 * Return flattened array of contentObj
 * @example { a1: '111', b1: '222' }  ->  [['', [['a1', '111'], ['b1', '222']]]]
 * @example { fa: { a1: '111', a2: '112'}, fb: { b1: '222'}}  ->  [["fa", [["a1", "111"], ["a2", "112"]]], ["fb", [["b1", "222"]]]]
 *
 * @param contentObj object of filecontents loaded by loader.js
 * @param containGroupFolder boolean
 */
function flattenContentObj(contentObj, containGroupFolder = false) {
  // flatten folder layer
  let folderBaseContentList;
  if (containGroupFolder) {
    folderBaseContentList = toPairs(contentObj).map(([folderName, fileContentObj]) => [
      folderName,
      toPairs(fileContentObj),
    ]);
  } else {
    // if folder layer is not exist, add a space folder
    folderBaseContentList = [['', toPairs(contentObj)]];
  }

  return folderBaseContentList;
}

/**
 * Return react Component(function) from fileContent
 *
 * @param fileContent instance of req(fileName)
 */
function getComponent(fileContent) {
  if (typeof fileContent === 'object' && typeof fileContent.default === 'function') {
    return fileContent.default;
  }
  return fileContent;
}

// /**
//  * Return composed purefunction and skip setting the first parameter
//  *
//  * @param funcList
//  */
// function composePureFuncSkipFirstParam(funcList) {
//   const allFuncs = funcList.map(({ func, params }) => {
//     if (params == null) {
//       return func;
//     }

//     return curry(func)(__, ...params);
//   });

//   return pipe(...allFuncs);
// }

/**
 * Return component applied all functions in funcList, funcList MUST be pure
 * @example funcList: [hoc1, hoc2]
 *  will return hoc2(hoc1(component))
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

/**
 * Change input element to list if it's not
 *
 * @param {any} elem
 */
function toList(elem) {
  if (Array.isArray(elem)) return elem;

  return [elem];
}

function toReact(Component) {
  const toReactFunc = props => <Component {...props} />;
  return toReactFunc;
}

export {
  basename,
  foldername,
  getRegExpFromRequireContext,
  isFileNameCorrect,
  isFilePathCorrect,
  applySubFuncs,
  isRequireContextRegExpPassed,
  flattenContentObj,
  getComponent,
  applyFuncList,
  unaryFunc,
  toList,
  toReact,
};
