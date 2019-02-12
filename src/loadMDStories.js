import loadStories from './core/loadStories';
import mdLoader from './plugin/mdLoader';

function loadMDStories(reqList = [], userOptions = {}) {
  loadStories(mdLoader, reqList, userOptions);
}

export default loadMDStories;
