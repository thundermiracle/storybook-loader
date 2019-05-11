import React = require('react');

declare function basename(filePath: string, regExpForRemove?: RegExp): string;
declare function foldername(filePath: string): string;
declare function getRegExpFromRequireContext(requireContext: any): RegExp;
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
      params?: string[];
    };
declare function applySubFuncs(baseObj: any, funcList?: FunctionListElement[]): void;
declare function isRequireContextRegExpPassed(requireContext: any): boolean;
declare function flattenContentObj(
  contentObj: object,
  containGroupFolder?: boolean,
): string[][];
declare function getComponent(fileContent: NodeModule): React.Component<any, any>;
declare function applyFuncList(
  component: React.Component<any, any>,
  funcList?: Function[],
): React.Component<any, any>;
declare function unaryFunc(func: Function, params?: any[]): Function;
declare function toList(elem: any): any[];
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
