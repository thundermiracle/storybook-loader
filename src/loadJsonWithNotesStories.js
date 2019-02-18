import loadStories from './core/loadStories';
import jsonLoader from './plugin/jsonLoader';
import createMdThirdParamMaker from './plugin/createMdThirdParamMaker';

function loadJsonWithNotesStories(requireContext, userOptions = {}, thirdParamMakerOptions = {}) {
  const thirdParamMaker = createMdThirdParamMaker(thirdParamMakerOptions);
  loadStories(jsonLoader, requireContext, { ...userOptions, thirdParamMaker }, true);
}

export default loadJsonWithNotesStories;
