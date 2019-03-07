## Description

storybook-loader is a package for [storybook](https://github.com/storybooks/storybook) to automatically load ALL files in a folder.

storybook-loader analyze the webpack's [require.context](https://webpack.js.org/guides/dependency-management/#requirecontext) return value and load the analyzed results to storyies.

After finishing the configuration, you will be free from manually adding story, as storybook-loader will load it for you automatically.