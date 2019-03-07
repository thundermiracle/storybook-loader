#### contentFuncList

  * Default: [ ramda.identity ] 

  * Description: list of pure functions for decorating file's contents. It's useful when you want to apply hocs(High Order Component) or hofs(High Order Function) to your content like withMUITheme, withLayout...

  * Attention: functions will receive ONLY ONE parameter -- the contents (could be string or React.Component). If function has more than one parameters, you can use util.unaryFunc to apply the rest parameters and then pass it to contentFuncList.

  * Example:

        -- NO.1 --------------------------------------------------------
        function decPrefixMsg(content, msg) {
          return `${msg}: ${content}`;
        }

        contentFuncList: [ 
          util.unaryFunc(decPrefixMsg, ['MyMessage is']),
        ]
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        stories.add(fileName, decPrefixMsg(content, 'MyMessage is'));

        -- NO.2 --------------------------------------------------------
        contentFuncList: [ 
          withMUITheme,
          withLayout,
        ]
        ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
        stories.add(fileName, withLayout(withMUITheme(content)));
