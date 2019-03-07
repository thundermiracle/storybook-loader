#### storySubFuncList

   * Default: []

   * Description: list of sub functions in storiesOf to call

   * Attention: parameters of sub function MUST be an array

   * Example:

          -- NO.1 --------------------------------------------------------
          storySubFuncList: [ 
            'subFunc1',
            [ 'addDecorator', [withNotes] ],
            [ 'addParameters', [{ options: { showAddonPanel: false } }] ],
          ]
          ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
          stories.subFunc1();
          stories.addDecorator(withNotes);
          stories.addParameters({ options: { showAddonPanel: false } });