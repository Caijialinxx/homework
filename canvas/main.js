//1. 初始化数据
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
//2. 设置画布自动布满视口
autoSetCanvasSize(canvas)
//3. 执行用户动作
painting(canvas)

/****************************/

/* 自动调整画布宽高 */
function autoSetCanvasSize(canvas){
  setCanvasSize(canvas)
  window.onresize = function(){
    setCanvasSize(canvas)
  }
  //设置画布宽高
  function setCanvasSize(canvas){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

/* 绘制操作 */
function painting(canvas){
  var isUsing = false;        //是否正在使用
  var previousPoint = {"x":undefined, "y":undefined};      //定义一个变量存储上一个点的坐标
  isPenOrEraser()
  //特性检测
  if(document.body.ontouchstart!==undefined){
    //触屏设备
    canvas.ontouchstart=function(e){
      console.log(e)
      var x = e.touches["0"].clientX
      var y = e.touches["0"].clientY
      previousPoint = {"x":x, "y":y}
      drawPoint(x,y,3)
      isUsing = true
    }
    canvas.ontouchmove=function(e){
      if(isUsing){
        var x=e.touches["0"].clientX
        var y=e.touches["0"].clientY
        var newPoint = {"x":x, "y":y}
        drawPoint(x,y,3)
        drawLine(previousPoint.x, previousPoint.y, newPoint.x, newPoint.y)
        previousPoint = newPoint
      }
    }
    canvas.ontouchend=function(e){
      isUsing = false
    }
  }
  else{
    //PC设备
    canvas.onmousedown=function(e){
      var x = e.clientX
      var y = e.clientY
      previousPoint = {"x":x, "y":y}
      drawPoint(x,y,3)
      isUsing = true
    }
    canvas.onmousemove=function(e){
      if(isUsing){
        var x=e.clientX
        var y=e.clientY
        var newPoint = {"x":x, "y":y}
        drawPoint(x,y,3)
        drawLine(previousPoint.x, previousPoint.y, newPoint.x, newPoint.y)
        previousPoint = newPoint
      }
    }
    canvas.onmouseup=function(e){
      isUsing = false
    }
  }
}

/* 判断当前状态时“画笔”还是“橡皮擦” */
function isPenOrEraser(){
  var eraser = document.getElementById("eraser")
  var pen = document.getElementById("pen")
  eraser.onclick = function(){
    changeStyle(0)
  }
  pen.onclick = function(){
    changeStyle(1)
  }
  //设置改变“画笔”或“橡皮擦”后的样式
  function changeStyle(flag){
    var tips = document.getElementById("tips")
    var parentNode = document.getElementById("behaviour")
    //“橡皮擦”被激活
    if(flag===0){
      tips.innerText = "当前状态：清除"
      parentNode.className="active"
      canvas.style.cursor="url(icon-eraser.png),auto"
      ctx.strokeStyle="#eee"
      ctx.fillStyle="#eee"
    }
    //“画刷”被激活
    else if(flag===1){
      tips.innerText = "当前状态：绘制"
      parentNode.className=""
      canvas.style.cursor="url(icon-pen.png),auto"
      ctx.strokeStyle="#000"
      ctx.fillStyle="#000"
    }
  }
}

//画圆点
function drawPoint(x,y,radius){
  ctx.beginPath()
  ctx.arc(x,y+32,radius,0,Math.PI*2)
  ctx.fill()
  //ctx.closePath()
}
//画轨迹（线条）
function drawLine(x1,y1,x2,y2){
  ctx.beginPath()
  ctx.lineWidth = 6
  ctx.moveTo(x1,y1+32)
  ctx.lineTo(x2,y2+32)
  ctx.stroke()
  //ctx.closePath()
}