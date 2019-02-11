import loader from './loader';

const defaultOptions = {
  noExtRegExp: /\.jsx?$/i,
  forceFilterExt: true,
};

function jsLoader(req, userOptions = {}) {
  return loader(req, { ...defaultOptions, ...userOptions});
}

export default jsLoader;
