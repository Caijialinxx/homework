# 原生 JavaScript 模拟 jQuery.ajax() 的实现
本项目使用原生 JavaScript 模拟了一个简单的 jQuery.ajax() 方法，本项目给出了 `GET` 请求和 `POST` 请求两个示例。去尝试一下吧~

## 使用方法
1. `git clone git@github.com:Caijialinxx/SendReqByJS.git`
2. 后台启动应用，例如 `node server.js 8001`
3. 打开开发者工具中的 Network
4. 输入相应内容并发送请求
    - 你可以输入输入框中提示的内容或者其他 path 参数甚至是一个完成的 URL 地址，然后观察对比。
    - 如果想向 `http://localhost:8000` 发送请求，你还需要再开多一个后台应用 `node server.js 8000`

## 说明
- 在 `POST` 请求中， user 字段将会被放入 Request Header 中， path 字段是发送 `POST` 请求的路径， content 字段是 `POST` 请求中的请求体。
- 当本地 URL 为任意端口时，合法的路径有 `xxx` 、 `/` 和 `main.js` （即 `http://localhost:你设置的端口号/xxx` ）；或者本地 URL 为 `8001` 端口时，合法的路径还有 `http://localhost:你设置的其他端口号/` （已为 `http://localhost:8001` 设置了 `Access-Control-Allow-Origin` ）。其他路径会返回 `404 Not Found` 。