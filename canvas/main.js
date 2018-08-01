//1. 初始化数据
let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext('2d'),
  eraserEnabled = false,
  pen = document.getElementById("pen"),
  eraser = document.getElementById("eraser"),
  color = document.getElementById("color"),
  thickness = document.getElementById("thickness"),
  actions = document.getElementById("actions")

//2. 设置画布自动布满视口
autoSetCanvasSize(canvas)

//3. 执行用户动作
painting(canvas)

color.addEventListener('click', (e) => {
  changeColor(e.target.id)
})
thickness.addEventListener('click', (e) => {
  changeThickness(e.target.id)
})
actions.addEventListener('click', (e) => {
  if (e.target.tagName === 'svg') {
    takeAction(e.target.id)
  } else if (e.target.tagName === 'use') {
    takeAction(e.target.parentElement.id)
  } else if (e.target.tagName === 'LI') {
    takeAction(e.target.children[0].id)
  }
})

function takeAction(element) {
  if (element === 'pen') {
    eraserEnabled = false
    pen.classList.add("active")
    eraser.classList.remove("active")
    color.className = "active"
    thickness.className = "active"
  } else if (element === 'eraser') {
    eraserEnabled = true
    pen.classList.remove("active")
    eraser.classList.add("active")
    color.className = "remove"
    thickness.className = "remove"
  } else if (element === 'clearall') {
    ctx.clearRect(0, 0, canvas.width, canvas.height)    //清屏
    pen.classList.add("active")
    eraser.classList.remove("active")
    color.className = "active"
    thickness.className = "active"
  } else if (element === 'save') {
    let a = document.createElement("a")
    a.href = canvas.toDataURL()           //获得图片地址
    a.target = "_blank"
    a.download = "image.png"
    a.click()
  }
}

/****************************/

/* 绘制操作 */
function painting(canvas) {
  ctx.strokeStyle = "black"
  ctx.fillStyle = "black"
  ctx.lineWidth = 2
  ctx.radius = 1
  let isUsing = false;        //是否正在使用
  let previousPoint = { x: undefined, y: undefined };      //定义一个变量存储上一个点的坐标
  //特性检测
  if (document.body.ontouchstart !== undefined) {
    //触屏设备
    canvas.ontouchstart = (e) => {
      let x = e.touches["0"].clientX
      let y = e.touches["0"].clientY
      if (!eraserEnabled) {
        previousPoint = { x: x, y: y }
        drawPoint(x, y, ctx.radius)
      }
      else {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      }
    }
    canvas.ontouchmove = (e) => {
      e.preventDefault()
      let x = e.touches["0"].clientX
      let y = e.touches["0"].clientY
      if (!eraserEnabled) {
        let newPoint = { x: x, y: y }
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
    canvas.onmousedown = (e) => {
      isUsing = true
      let x = e.clientX
      let y = e.clientY
      if (!eraserEnabled) {
        previousPoint = { x: x, y: y }
        drawPoint(x, y, ctx.radius)
      }
      else {
        ctx.clearRect(x - 5, y - 5, 10, 10)
      }
    }
    canvas.onmousemove = (e) => {
      if (isUsing) {
        let x = e.clientX
        let y = e.clientY
        let newPoint = { x: x, y: y }
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
    canvas.onmouseup = (e) => {
      isUsing = false
    }
  }
}

/* 选笔触颜色 */
function changeColor(color) {
  ctx.strokeStyle = color
  ctx.fillStyle = color
  whichActived(color, 'color')
}
/* 选笔触粗细 */
function changeThickness(thickness) {
  if (thickness === 'thin') {
    ctx.lineWidth = 2
    ctx.radius = 1
  } else if (thickness === 'middle') {
    ctx.lineWidth = 6
    ctx.radius = 3
  } else if (thickness === 'thick') {
    ctx.lineWidth = 10
    ctx.radius = 5
  }
  whichActived(thickness, 'thickness')
}
function whichActived(target, parentID) {
  let parentNode = document.getElementById(parentID)
  for (let i = 0; i < parentNode.children.length; i++) {
    if (target === parentNode.children[i].id) {
      parentNode.children[i].className = "active"
    }
    else {
      parentNode.children[i].className = ""
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
  window.onresize = () => {
    setCanvasSize(canvas)
  }
  //设置画布宽高
  function setCanvasSize(canvas) {
    let pageWidth = document.documentElement.clientWidth
    let pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}