#### groupByFolder

  * Default: true

  * Description: use folder name as the root stories' name.

  * Attention: If you set groupByFolder to false, all stories will be added to ONE root named by folderNameWhenEmpty(default is ALL).

  * Example:
      
        -- NO.1 --------------------------------------------------------
        groupByFolder: true

        /Button/Pattern1.js
        /Button/Pattern2.js
        /TextField/Pattern1.js
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        Button
          - Pattern1
          - Pattern2
        TextField
          - Pattern1
          
        -- NO.2 --------------------------------------------------------
        groupByFolder: false

        /Button/Pattern1.js
        /Button/Pattern2.js
        /TextField/Pattern1.js
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        ALL
          - Pattern1 (the second Pattern1 will be ignored)
          - Pattern2