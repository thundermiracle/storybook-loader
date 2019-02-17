import mdLoader from './mdLoader';

function formatWithNotesObject(content) {
  return {
    notes: {
      markdown: content,
    },
  };
}

const defaultThirdParamOptions = {
  loader: mdLoader,
  formatter: formatWithNotesObject,
};

function createMdThirdParamMaker(userOptions = {}) {
  const { loader, formatter } = { ...defaultThirdParamOptions, ...userOptions };
  const reqCache = {};

  function thirdParamMaker(req, filePath) {
    // get from cache
    const key = req.id;
    if (!reqCache[key]) {
      reqCache[key] = loader(req, { groupByFolder: false });
    }

    const content = reqCache[key][filePath] || ' ';

    return formatter(content);
  }

  return thirdParamMaker;
}

export default createMdThirdParamMaker;
