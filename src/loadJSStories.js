import jsLoader from './jsLoader';
import loadStories from './loadStories';

function loadJSStories(reqList = [], userOptions = {}) {
  loadStories(jsLoader, reqList, userOptions, true);
}

export default loadJSStories;
