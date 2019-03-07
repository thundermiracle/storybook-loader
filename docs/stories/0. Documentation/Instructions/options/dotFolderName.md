#### dotFolderName
  * Default: .

  * Description: used as folder name when it's a dot(.)

  * Example: 
        -- NO.1 --------------------------------------------------------
        ignoreDotFolder: false
        dotFolderName: 'RootFolder'

        ./Pattern1.js
        /Button/Pattern1.js
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        RootFolder
          - Pattern1
        Button
          - Pattern1
