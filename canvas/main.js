//1. 初始化数据
var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
var eraserEnabled = false
var pen = document.getElementById("pen")
var eraser = document.getElementById("eraser")
var clearall = document.getElementById("clearall")
var save = document.getElementById("save")
var color = document.getElementById("color")
var thickness = document.getElementById("thickness")

//2. 设置画布自动布满视口
autoSetCanvasSize(canvas)

//3. 执行用户动作
painting(canvas)

pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add("active")
  eraser.classList.remove("active")
  color.className = "active"
  thickness.className = "active"
}
eraser.onclick = function () {
  eraserEnabled = true
  pen.classList.remove("active")
  eraser.classList.add("active")
  color.className = "remove"
  thickness.className = "remove"
}
clearall.onclick = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)    //清屏
  pen.classList.add("active")
  eraser.classList.remove("active")
  color.className = "active"
  thickness.className = "active"
}
save.onclick = function () {
  var a = document.createElement("a")
  a.href = canvas.toDataURL()           //获得图片地址
  a.target = "_blank"
  a.download = "image.png"
  a.click()
}

/****************************/

/* 绘制操作 */
function painting(canvas) {
  ctx.strokeStyle = "black"
  ctx.fillStyle = "black"
  ctx.lineWidth = 2
  ctx.radius = 1
  whichColor()
  whichThickness()
  var isUsing = false;        //是否正在使用
  var previousPoint = { x: undefined, y: undefined };      //定义一个变量存储上一个点的坐标

  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = function (e) {
      var x = e.touches["0"].clientX
      var y = e.touches["0"].clientY
      if (!eraserEnabled) {
        previousPoint = { x: x, y: y }
        drawPoint(x, y, ctx.radius)
      }
      else {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      }
    }
    canvas.ontouchmove = function (e) {
        var x = e.touches["0"].clientX
        var y = e.touches["0"].clientY
        if (!eraserEnabled) {
          var newPoint = { x: x, y: y }
          drawPoint(x, y, ctx.radius)           //需要添加此函数才不会使得画出来的线在lineWidth变大时不完整
          drawLine(previousPoint.x, previousPoint.y, newPoint.x, newPoint.y)
          previousPoint = newPoint
        }
        else {
          ctx.clearRect(x - 8, y - 8, 16, 16)
        }
    }
  }
  else {
    //PC设备
    canvas.onmousedown = function (e) {
      isUsing = true
      var x = e.clientX
      var y = e.clientY
      if (!eraserEnabled) {
        previousPoint = { x: x, y: y }
        drawPoint(x, y, ctx.radius)
      }
      else {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      }
    }
    canvas.onmousemove = function (e) {
      if (isUsing) {
        var x = e.clientX
        var y = e.clientY
        var newPoint = { x: x, y: y }
        if (!eraserEnabled) {
          drawPoint(x, y, ctx.radius)
          drawLine(previousPoint.x, previousPoint.y, newPoint.x, newPoint.y)
          previousPoint = newPoint
        }
        else {
          ctx.clearRect(x - 5, y - 5, 10, 10)
        }
      }
    }
    canvas.onmouseup = function (e) {
      isUsing = false
    }
  }
}

/* 选笔触颜色 */
function whichColor() {
  var black = document.getElementById("black")
  var red = document.getElementById("red")
  var green = document.getElementById("green")
  var blue = document.getElementById("blue")
  black.onclick = function () {
    changeColor("black")
  }
  red.onclick = function () {
    changeColor("red")
  }
  green.onclick = function () {
    changeColor("green")
  }
  blue.onclick = function () {
    changeColor("blue")
  }
  function changeColor(color) {
    var parentNode = document.getElementById("color")
    for (var i = 0; i < parentNode.children.length; i++) {
      if (color === parentNode.children[i].id) {
        parentNode.children[i].className = "active"
        ctx.strokeStyle = color
        ctx.fillStyle = color
      }
      else {
        parentNode.children[i].className = ""
      }
    }
  }
}
/* 选笔触粗细 */
function whichThickness() {
  var thin = document.getElementById("thin")
  var middle = document.getElementById("middle")
  var thick = document.getElementById("thick")
  thin.onclick = function (e) {
    changeThickness("thin", 2)
  }
  middle.onclick = function (e) {
    changeThickness("middle", 6)
  }
  thick.onclick = function (e) {
    changeThickness("thick", 10)
  }
  function changeThickness(thickness, value) {
    var parentNode = document.getElementById("thickness")
    for (var i = 0; i < parentNode.children.length; i++) {
      if (thickness === parentNode.children[i].id) {
        parentNode.children[i].className = "active"
        ctx.lineWidth = value
        ctx.radius = value / 2
      }
      else {
        parentNode.children[i].className = ""
      }
    }
  }
}

/* 画圆点 */
function drawPoint(x, y, radius) {
  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fill()
}
/* 画轨迹（线条） */
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
  //ctx.closePath()会导致线条粗细不均
}

/* 自动调整画布宽高 */
function autoSetCanvasSize(canvas) {
  setCanvasSize(canvas)
  window.onresize = function () {
    setCanvasSize(canvas)
  }
  //设置画布宽高
  function setCanvasSize(canvas) {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}