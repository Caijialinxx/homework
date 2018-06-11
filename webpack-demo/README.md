# Getting Start

## Installation
在安装之前，我们可以设置 npm ，使其下载更快些：
```bash
# 了解 npm 发的每一个请求
npm config set loglevel http
# 关闭进度条
npm config set progress false
# 从淘宝的服务器下载各种包。不过这会让你在 npm adduser 的时候出问题，想要恢复成原样，只需要 npm config delete registry 即可
npm config set registry https://registry.npm.taobao.org/
touch ~/.bashrc
# 让 npm 从淘宝下载 phantomjs
echo 'export PHANTOMJS_CDNURL="http://npm.taobao.org/mirrors/phantomjs"' >> ~/.bashrc 
# 让 npm 从淘宝下载 SASS
echo 'export SASS_BINARY_SITE="https://npm.taobao.org/mirrors/node-sass"' >> ~/.bashrc 
source ~/.bashrc
```
当然你也可以跳过，直接执行下面的命令：
```bash
mkdir webpack-demo && cd webpack-demo
npm init -y
# If you're using webpack v4 or later, you'll need to install a CLI.
npm install webpack webpack-cli --save-dev
```

## Get Ready
新增文件得到下列目录结构：
```
  webpack-demo
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```
代码开启照抄模式：

src/index.js
```javascript
function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

index.html
```html
<!doctype html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

为了防止意外发布代码，我们还需要调整 package.json 文件，以便确保我们安装包是私有的(private)，并且移除 main 入口。

package.json
```bash
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
+   "private": true,
-   "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.0.1",
      "webpack-cli": "^2.0.9"
    },
    "dependencies": {}
  }
```

## Creating a Bundle
首先，我们稍微调整下目录结构，将“源”代码(`/src`)从我们的“分发”代码(`/dist`)中分离出来。“源”代码是用于书写和编辑的代码。“分发”代码是构建过程产生的代码最小化和优化后的“输出”目录，最终将在浏览器中加载：

project
```bash
  webpack-demo
  |- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

要在 index.js 中打包 lodash 依赖，我们需要在本地安装 library：
```
npm install --save lodash
```

> 在安装一个要打包到生产环境的安装包时，你应该使用 npm install --save，如果你在安装一个用于开发环境的安装包（例如，linter, 测试库等），你应该使用 npm install --save-dev。请在 npm 文档 中查找更多信息。

现在，修改我们的文件：

src/index.js
```js
+ import _ from 'lodash';
+
  function component() {
    var element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
+   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

由于通过打包来合成脚本，我们必须更新 index.html 文件。因为现在是通过 import 引入 lodash，所以将 lodash `<script>` 删除，然后修改另一个 `<script>` 标签来加载 bundle，而不是原始的 `/src` 文件：

dist/index.html
```html
  <!doctype html>
  <html>
   <head>
     <title>起步</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
  </html>
```

然后执行 `npx webpack` ，会将我们的脚本作为入口起点，然后输出为 `main.js` 。

此时，在浏览器中打开 `index.html` ，就可以看到“Hello webpack”。


### Using a Configuration
我们还可以使用一个配置文件来取代上述做法：
```bash
  webpack-demo
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

webpack.config.js
```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

index.html
```html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
-   <script src="main.js"></script>
+   <script src="bundle.js"></script>
  </body>
</html>
```

现在，让我们通过新配置文件再次执行构建：
```bash
npx webpack --config webpack.config.js
```

最终得到相同的结果。此时目录结构为：
```bash
  webpack-demo
  |- package.json
  |- webpack.config.js
  |- /dist
+   |- bundle.js
    |- index.html
  |- /src
    |- index.js
```


## NPM Scripts
由于每次更新代码都要运行 `npx webpack --config webpack.config.js` 很不方便，所以我们可以在 package.json 中添加一个 npm scripts ：

package.json
```json
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "private": true,
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
+   "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.3"
  },
  "dependencies": {
    "jquery": "^3.3.1",
    "lodash": "^4.17.10"
  }
}
```
那么现在就可以直接运行 `npm run build` 来替代之前的命令。