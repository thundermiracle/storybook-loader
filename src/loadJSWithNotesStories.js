import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';
import createMdThirdParamMaker from './plugin/createMdThirdParamMaker';

function loadJSWithNotesStories(reqList = [], userOptions = {}, thirdParamMakerOptions = {}) {
  const thirdParamMaker = createMdThirdParamMaker(thirdParamMakerOptions);
  loadStories(jsLoader, reqList, { ...userOptions, thirdParamMaker }, true);
}

export default loadJSWithNotesStories;
