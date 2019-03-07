#### ignoreDotFolder
  * Default: true

  * Description: ignore files under root folder (. folder)

  * Example: 
        -- NO.1 --------------------------------------------------------
        ignoreDotFolder: true

        ./Pattern1.js
        /Button/Pattern1.js
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        Button
          - Pattern1
  
        -- NO.2 --------------------------------------------------------
        ignoreDotFolder: false

        ./Pattern1.js
        /Button/Pattern1.js
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        .
          - Pattern1
        Button
          - Pattern1
