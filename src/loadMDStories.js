import loadStories from './core/loadStories';
import mdLoader from './plugin/mdLoader';

function loadMDStories(requireContext, userOptions = {}) {
  loadStories(mdLoader, requireContext, userOptions);
}

export default loadMDStories;
