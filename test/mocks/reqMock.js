/* eslint-disable quote-props */
/* eslint-disable camelcase */
// mock for require.context
const reqWithRegExp = (function () {
  const path1 = './base/sub1/mdfile1.md';
  const path2 = './base/sub2/mdfile2.md';

  const contents = {
    [path1]: 'content of mdfile1.md',
    [path2]: 'content of mdfile2.md',
  };

  const context = (key) => {
    return contents[key];
  };

  context.keys = () => {
    return [path1, path2];
  };

  context.id = './stories sync recursive \\.md$';

  // #region for test
  context.result = {
    'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
    'base/sub2/mdfile2': ['mdfile2', 'content of mdfile2.md'],
  };
  context.resultWithExt = {
    'base/sub1/mdfile1.md': ['mdfile1.md', 'content of mdfile1.md'],
    'base/sub2/mdfile2.md': ['mdfile2.md', 'content of mdfile2.md'],
  };
  // #endregion

  return context;
}());

const reqWithNoRegexp = (function () {
  const path1_0 = './base/sub1/mdfile1';
  const path1 = './base/sub1/mdfile1.md';
  const path2_0 = './base/sub2/mdfile2';
  const path2 = './base/sub2/mdfile2.md';
  const path3_0 = './base/sub1/jsfile1';
  const path3 = './base/sub1/jsfile1.js';

  const contents = {
    [path1_0]: 'content of mdfile1.md',
    [path1]: 'content of mdfile1.md',
    [path2_0]: 'content of mdfile2.md',
    [path2]: 'content of mdfile2.md',
    [path3_0]: 'content of jsfile1.js',
    [path3]: 'content of jsfile1.js',
  };

  const context = (key) => {
    return contents[key];
  };

  context.keys = () => {
    return [path1_0, path1, path2_0, path2, path3_0, path3];
  };

  context.id = './stories sync recursive ^\\.\\/.*$';

  // #region for test
  context.resultMd = {
    'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
    'base/sub2/mdfile2': ['mdfile2', 'content of mdfile2.md'],
  };
  context.resultMdWithExt = {
    'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
    'base/sub1/mdfile1.md': ['mdfile1.md', 'content of mdfile1.md'],
    'base/sub2/mdfile2': ['mdfile2', 'content of mdfile2.md'],
    'base/sub2/mdfile2.md': ['mdfile2.md', 'content of mdfile2.md'],
  };
  context.resultMdGroup = {
    'base/sub1': {
      'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
    },
    'base/sub2': {
      'base/sub2/mdfile2': ['mdfile2', 'content of mdfile2.md'],
    },
  };
  context.resultNoFilter = {
    'base/sub1/jsfile1': ['jsfile1', 'content of jsfile1.js'],
    'base/sub1/jsfile1.js': ['jsfile1.js', 'content of jsfile1.js'],
    'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
    'base/sub1/mdfile1.md': ['mdfile1.md', 'content of mdfile1.md'],
    'base/sub2/mdfile2': ['mdfile2', 'content of mdfile2.md'],
    'base/sub2/mdfile2.md': ['mdfile2.md', 'content of mdfile2.md'],
  };
  // #endregion

  return context;
}());

const reqWithRootFolder = (function () {
  const path1 = './base/sub1/mdfile1.md';
  const path2 = './mdfile2.md';

  const contents = {
    [path1]: 'content of mdfile1.md',
    [path2]: 'content of mdfile2.md',
  };

  const context = (key) => {
    return contents[key];
  };

  context.keys = () => {
    return [path1, path2];
  };

  context.id = './stories sync recursive \\.md$';

  // #region for test
  context.result = {
    'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
    './mdfile2': ['mdfile2', 'content of mdfile2.md'],
  };
  context.resultIgnoreDotFolder = {
    'base/sub1/mdfile1': ['mdfile1', 'content of mdfile1.md'],
  };
  // #endregion

  return context;
}());
const reqWithDotFolder = (function () {
  const path1 = './mdfile1.md';

  const contents = {
    [path1]: 'content of mdfile1.md',
  };

  const context = (key) => {
    return contents[key];
  };

  context.keys = () => {
    return [path1];
  };

  context.id = './stories sync recursive \\.md$';

  // #region for test
  context.result = {
    '.': ['mdfile1', 'content of mdfile1.md'],
  };
  // #endregion

  return context;
}());

export {
  reqWithRegExp, reqWithNoRegexp,
  reqWithRootFolder, reqWithDotFolder,
};
