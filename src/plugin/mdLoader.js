import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.md$/i,
};

/**
 * @default
 * loaderOptions: {
 * 　includeRegExp: /\.md$/i,
 * }
 */
function mdLoader(req, loaderOptions = {}) {
  return loader(req, { ...defaultOptions, ...loaderOptions });
}

export default mdLoader;
