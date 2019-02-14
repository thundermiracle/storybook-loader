const reqList = [
  require.context('./'),
];

const options = {
  contentFuncList: [
    injectAll,
  ],
  hierarchyRoot: 'JS|',
  storySubFuncList: [
    [
      'addDecorator',
      [withNotes],
    ],
  ],
};

loadJSWithNotesStories(reqList, options);




const req = require.context('./');

const options = {
  contentFuncList: [
    doc,
  ],
  hierarchyRoot: 'Description|',
  storySubFuncList: [
    [
      'addParameters',
      [{ options: { showAddonPanel: false } }],
    ],
  ],
}

loadMDStories(req, options);