import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.json$/i,
  forceFilterExt: true,
};

function jsonLoader(req, userOptions = {}) {
  return loader(req, {...defaultOptions, ...userOptions});
}

export default jsonLoader;
