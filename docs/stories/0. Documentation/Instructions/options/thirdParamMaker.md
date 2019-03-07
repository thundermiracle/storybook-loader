#### thirdParamMaker

  * Default: null

  * Description: function to make 3rd parameter of stories.add(xx, xx, 3rdParam). 
    thirdParamMaker(instance of require.context, filePath).

  * Attention: this function is called after every single file is loaded.

  * Example: [createMDThirdParamMaker](/src/plugin/createMDThirdParamMaker.js)
