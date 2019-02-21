import loader from '../core/loader';

const defaultOptions = {
  includeRegExp: /\.md$/i,
};

function mdLoader(req, userOptions = {}) {
  return loader(req, { ...defaultOptions, ...userOptions});
}

export default mdLoader;
