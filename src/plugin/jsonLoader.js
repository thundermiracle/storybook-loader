import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.json$/i,
};

function jsonLoader(req, userOptions = {}) {
  return loader(req, { ...defaultOptions, ...userOptions });
}

export default jsonLoader;
