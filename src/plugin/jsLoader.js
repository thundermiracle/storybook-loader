import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.jsx?$/i,
  excludeRegExp: /\.stories.js$/i,
};

/**
 * @default
 * loaderOptions = {
 * 　includeRegExp: /\.jsx?$/i,
 * 　excludeRegExp: /\.stories.js$/i,
 * }
 */
function jsLoader(req, loaderOptions = {}) {
  return loader(req, { ...defaultOptions, ...loaderOptions });
}

export default jsLoader;
