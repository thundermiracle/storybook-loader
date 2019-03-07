#### formatter
  * Default: formatWithNotesObject() in [createMDThirdParamMaker](/src/plugin/createMDThirdParamMaker.js)

  * Description: format the content

  * Example
      ```js
      function formatWithNotesObject(content) {
        return {
          notes: {
            markdown: content,
          },
        };
      }
      ```