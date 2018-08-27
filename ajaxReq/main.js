window.jQuery = function () { }
window.$ = window.jQuery

$.ajax = function ({ url, method, body, headers }) {
  return new Promise(function (resolve, reject) {
    let request = new XMLHttpRequest()
    request.open(method, url)
    for (let key in headers) {
      let value = headers[key]
      request.setRequestHeader(key, value)
    }
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status >= 200 && request.status < 300) {
          resolve.call(undefined, request)
        } else if (request.status >= 400) {
          reject.call(undefined, request)
        }
      }
    }
    request.send(body)
  })
}

sendPOST.addEventListener('click', (e) => {
  e.preventDefault()
  let user = post_user.value,
    path = post_path.value,
    content = post_content.value
  window.jQuery.ajax({
    url: './' + path,
    method: 'post',
    body: content,
    headers: {
      'content-type': 'text/plain;charset=UTF-8',
      'author': user
    }
  }).then(
    (request) => {
      showResult(request)
    },
    (request) => {
      showResult(request)
    }
  )
})
sendGET.addEventListener('click', (e) => {
  e.preventDefault()
  let path = get_path.value
  window.jQuery.ajax({
    url: path,
    method: 'get'
  }).then(
    (request) => {
      showResult(request)
    },
    (request) => {
      showResult(request)
    }
  )
})

function showResult(request){
  result.style.display = 'flex';
  rep_url.innerText = request.responseURL
  rep_content.innerText = request.responseText
  rep_status.innerText = request.status
  rep_statusText.innerText = request.statusText
}