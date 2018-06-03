let btns = $('ul').find('li')
let imgs = $('.images').find('img')
let imgWindow = $('.images')
let num = 1
let intervalID = autoSlide()

// 点击按钮的动画
btns.click((e) => {
  e.preventDefault()
  // 清除定时器，等待执行滚动到指定图片动画
  window.clearInterval(intervalID)

  let currentTarget = $(e.currentTarget)
  if ($(e.currentTarget).index() === 0) {
    currentTarget = $(e.currentTarget).next();
  }
  // 获取到点击的按钮索引值并实现滚动
  let index = currentTarget.index()
  slide(index - 1)

  // 滚动到指定动画结束，恢复定时器
  num = index
  intervalID = autoSlide()
})

// 鼠标悬停则动画停止，离开则继续
imgWindow.mouseenter(() => {
  window.clearInterval(intervalID)
}).mouseleave(() => {
  intervalID = autoSlide()
})

function autoSlide() {
  return setInterval(() => {
    slide(num)
    num++
  }, 2000)
}
function slide(index) {
  imgWindow.css({ "margin-left": `${(which(index)) * -920}px` })
  btns.eq(which(index) + 1).addClass('active').siblings().removeClass('active');
}
function which(n) {
  return n % imgs.length
}