import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';
import createMDThirdParamMaker from './plugin/createMDThirdParamMaker';

function loadJSWithNotesStories(requireContext, userOptions = {}, thirdParamMakerOptions = {}) {
  const thirdParamMaker = createMDThirdParamMaker(thirdParamMakerOptions);
  loadStories(jsLoader, requireContext, { ...userOptions, thirdParamMaker }, true);
}

export default loadJSWithNotesStories;
