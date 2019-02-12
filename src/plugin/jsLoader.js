import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.jsx?$/i,
  excludeRegExp: /\.stories.js$/i,
  forceFilterExt: true,
};

function jsLoader(req, userOptions = {}) {
  return loader(req, { ...defaultOptions, ...userOptions});
}

export default jsLoader;
