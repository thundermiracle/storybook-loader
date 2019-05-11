import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.json$/i,
};

/**
 * @default
 * loaderOptions: {
 *   includeRegExp: /\.json$/i,
 * }
 */
function jsonLoader(req, loaderOptions = {}) {
  return loader(req, { ...defaultOptions, ...loaderOptions });
}

export default jsonLoader;
