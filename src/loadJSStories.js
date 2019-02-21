import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';

function loadJSStories(requireContext, userOptions = {}) {
  loadStories(jsLoader, requireContext, userOptions, true);
}

export default loadJSStories;
