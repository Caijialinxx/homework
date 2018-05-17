var intervalId, n = 0;
intervalId = intervalSlide();

// 上一张
$(prev).click(() => {
  window.clearInterval(intervalId);
  n = which(n - 2) - 1;
  slide();
});
// 下一张
$(next).click(() => {
  window.clearInterval(intervalId);
  slide();
});

$('.items > span').click((e) => {
  window.clearInterval(intervalId);
  var picIndex = $(e.target).index();
  n = picIndex - 1;
  slide();
});

// 鼠标悬停，轮播停止
$('.window').mouseenter(() => {
  window.clearInterval(intervalId);
});
$('.window').mouseleave(() => {
  intervalId = intervalSlide();
});

function intervalSlide() {
  return setInterval(() => {
    slide();
  }, 2000);
}

function slide() {
  console.log(n);
  // 上一张图standby
  $(`img:nth-child(${which(n - 1)})`).removeClass('leave enter').addClass('standby');
  // 当前图leave
  $(`img:nth-child(${which(n)})`).removeClass('enter standby').addClass('leave');
  // 下一张图enter
  $(`img:nth-child(${which(n + 1)})`).removeClass('standby leave').addClass('enter');
  // 圆点随之变化
  $(`.items > span:eq(${which(n + 1) - 1})`).addClass('active').siblings('.active').removeClass('active');
  n++;
}

function which(index) {
  if (index < 0) { index += 3; }  //解决负数返回错误的值。-3 -2 -1 => 0 1 2
  else if (index > 2) { index = index % 3; }
  return index + 1;       // 第 1/2/3 张图
}