var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号，如 node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 这是一个分隔符 ************/

  if(path == '/'){
    response.setHeader('Content-Type', 'text/html; charset=utf-8')
    response.write('<!Doctype>\n<html>'+
    '<head><link rel="stylesheet" href="/style.css">'+
    '</head><body>'+
    '<h1>任务7作业√</h1>'+
    '<script src="/main.js"></script>'+
    '</body></html>')
    response.end()
  }
  else if(path == '/style.css'){
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write('body{background-color:black; margin-top:300px; color:red; text-align:center}')
    response.end()
  }
  else if(path == '/main.js'){
    response.setHeader('Content-Type', 'text/javascript; charset=utf-8')
    response.write('alert("请打满分~ xixixi...")')
    response.end()
  }
  else{
    response.statusCode = 404
    response.end()
  }

  /******** 这是一个分隔符 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 端口成功 \n现在可以打开 http://localhost:' + port)