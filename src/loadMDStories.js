import mdLoader from './mdLoader';
import loadStories from './loadStories';

function loadMDStories(reqList = [], userOptions = {}) {
  loadStories(mdLoader, reqList, userOptions);
}

export default loadMDStories;
