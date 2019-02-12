import loadStories from './core/loadStories';
import jsLoader from './plugin/jsLoader';

function loadJSStories(reqList = [], userOptions = {}) {
  loadStories(jsLoader, reqList, userOptions, true);
}

export default loadJSStories;
