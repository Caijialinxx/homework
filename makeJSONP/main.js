btn.addEventListener('click', () => {
    let script = document.createElement('script')
    let functionName = 'c' + parseInt(Math.random() * 10000, 10)
    script.src = 'http://jack.com:8002/pay?callback=' + functionName
    document.body.appendChild(script)

    window[functionName] = function (res) {
        alert(res)
    }

    script.onload = function (e) {
        e.target.remove()
        delete window[functionName]
    }
    script.onerror = function (e) {
        e.target.remove()
        delete window[functionName]
    }
})