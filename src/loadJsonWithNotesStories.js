import loadStories from './core/loadStories';
import jsonLoader from './plugin/jsonLoader';
import createMDThirdParamMaker from './plugin/createMDThirdParamMaker';

function loadJsonWithNotesStories(requireContext, userOptions = {}, thirdParamMakerOptions = {}) {
  const thirdParamMaker = createMDThirdParamMaker(thirdParamMakerOptions);
  loadStories(jsonLoader, requireContext, { ...userOptions, thirdParamMaker }, true);
}

export default loadJsonWithNotesStories;
