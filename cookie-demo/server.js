var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) { queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)

  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    console.log(request.headers.cookie)
    if (request.headers.cookie) {
      response.write(`<h1>Welcome!</h1>`)
    } else {
      response.write(`<h1>
        请<a href='/login.html'>登录！</a>
        如果未注册，<a href='/signup.html'>请注册</a>
      </h1>`)
    }
    response.end()
  } else if (path === '/login.html' && method === 'GET') {
    let htmlString = fs.readFileSync('./login.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(htmlString)
    response.end()
  } else if (path === '/login.html' && method === 'POST') {
    parseBody(request).then((body) => {
      let hash = {}
      let stringArr = body.split('&')
      stringArr.forEach(str => {
        let part = str.split('=')
        let name = part[0], value = part[1]
        hash[name] = value
      });
      let { email, password } = hash
      let users = JSON.parse(fs.readFileSync('./db_users', 'utf8'))
      users.forEach((user, index) => {
        if (user.email === email) {
          if (user.password === password) {
            response.statusCode = 200
            response.setHeader('Set-Cookie', `user=${email}`)
          } else {
            response.statusCode = 403
            response.setHeader('Content-Type', 'application/json;charset=utf-8')
            response.write(`{
              "error": {
                "code": 20,
                "message": "Password doesn't match."
              }
            }`)
          }
        } else if (index === users.length - 1) {
          response.statusCode = 403
          response.setHeader('Content-Type', 'application/json;charset=utf-8')
          response.write(`{
            "error": {
              "code": 21,
              "message": "Email address doesn't exist."
            }
          }`)
        }
      })
      response.end()
    })
  } else if (path === '/signup.html' && method === 'GET') {
    let htmlString = fs.readFileSync('./signup.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(htmlString)
    response.end()
  } else if (path === '/signup.html' && method === 'POST') {
    parseBody(request).then((body) => {
      let hash = {}
      let stringArr = body.split('&')
      stringArr.forEach(str => {
        let part = str.split('=')
        let name = part[0], value = part[1]
        hash[name] = value
      });
      let { email, password, password_confirmation } = hash
      if (email.indexOf('@') === -1) {
        response.statusCode = 422
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`{
          "error": {
            "code": 10,
            "message": "Email address is invalid."
          }
        }`)
      } else if (password !== password_confirmation) {
        response.statusCode = 422
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`{
          "error": {
            "code": 11,
            "message": "Passwords is not the same."
          }
        }`)
      } else {
        let users = JSON.parse(fs.readFileSync('./db_users', 'utf8'))
        let inUsed = false
        users.forEach(user => {
          if (user.email === email) {
            inUsed = true
            return
          }
        })
        if (!inUsed) {
          users.push({ email: email, password: password })
          fs.writeFileSync('./db_users', JSON.stringify(users))
          response.statusCode = 200
        } else {
          response.statusCode = 422
          response.setHeader('Content-Type', 'application/json;charset=utf-8')
          response.write(`{
            "error": {
              "code": 12,
              "message": "Email address existed."
            }
          }`)
        }
      }
      response.end()
    })
  } else if (path === '/style.css') {
    let cssString = fs.readFileSync('./style.css', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(cssString)
    response.end()
  } else if (path === '/main.js') {
    let javascriptString = fs.readFileSync('./main.js', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(javascriptString)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`<h1>404 Not Found</h1>`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


// 自定义函数
function parseBody(request) {
  return new Promise((resovle, reject) => {
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = decodeURIComponent(Buffer.concat(body).toString())
      resovle(body)
    })
  })
}