import React from 'react';

declare function basename(filePath: string, regExpForRemove?: RegExp): string;
declare function foldername(filePath: string): string;
declare function getRegExpFromRequireContext(requestContext: any): RegExp;
declare function isFileNameCorrect(
  filePath: string,
  includeRegExp: RegExp,
  excludeRegExp?: RegExp,
): boolean;
declare function isFilePathCorrect(
  filePath: string,
  includeRegExp: RegExp,
  excludeRegExp?: RegExp,
): boolean;

type FunctionListElement =
  | string
  | {
      funcName: string;
      params?: Array<string>;
    };
declare function applySubFuncs(baseObj: any, funcList?: Array<FunctionListElement>): void;
declare function isRequireContextRegExpPassed(requestContext: any): boolean;
declare function flattenContentObj(
  contentObj: object,
  containGroupFolder?: boolean,
): Array<Array<string>>;
declare function getComponent(fileContent: NodeModule): React.Component<any, any>;
declare function applyFuncList(
  component: React.Component<any, any>,
  funcList?: Function[],
): React.Component<any, any>;
declare function unaryFunc(func: Function, params?: Array<any>): Function;
declare function toList(elem: any): Array<any>;
declare function toReact(Component: React.Component<any, any>): JSX.Element;

export {
  FunctionListElement,
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
