import loader from './loader';

const defaultOptions = {
  noExtRegExp: /\.md$/i,
  forceFilterExt: true,
};

function mdLoader(req, userOptions = {}) {
  return loader(req, { ...defaultOptions, ...userOptions});
}

export default mdLoader;
