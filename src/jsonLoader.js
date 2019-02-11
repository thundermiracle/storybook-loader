import loader from './loader';

const defaultOptions = {
  noExtRegExp: /\.json$/i,
  forceFilterExt: true,
};

function jsonLoader(req, userOptions = {}) {
  return loader(req, {...defaultOptions, ...userOptions});
}

export default jsonLoader;
