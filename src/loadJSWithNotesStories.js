import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';
import createMdThirdParamMaker from './plugin/createMdThirdParamMaker';

function loadJSWithNotesStories(requireContext, userOptions = {}, thirdParamMakerOptions = {}) {
  const thirdParamMaker = createMdThirdParamMaker(thirdParamMakerOptions);
  loadStories(jsLoader, requireContext, { ...userOptions, thirdParamMaker }, true);
}

export default loadJSWithNotesStories;
