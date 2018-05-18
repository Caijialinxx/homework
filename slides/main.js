var intervalId = intervalSlide(), n = 0;

// 上一张
$(prev).click(() => {
  clickSlide(which(n - 2) - 1);
});
// 下一张
$(next).click(() => {
  clickSlide(n);
});
// 圆点导航
$('.items > span').click((e) => {
  clickSlide($(e.target).index() - 1);
});

// 鼠标悬停，轮播停止。仅在div.images上有效，当鼠标悬停在所有按钮上时轮播不受影响。
$('.images').mouseenter(() => {
  window.clearInterval(intervalId);
});
$('.images').mouseleave(() => {
  intervalId = intervalSlide();
});

// 点击时的动画函数
function clickSlide(target_N) {
  window.clearInterval(intervalId);
  n = target_N;
  slide();
  intervalId = intervalSlide();
}
// 循环播放
function intervalSlide() {
  return setInterval(() => {
    slide();
  }, 2000);
}
// 播放一次的动画函数
function slide() {
  // 上一张图standby
  $(`.images > img:nth-child(${which(n - 1)})`).removeClass('leave enter').addClass('standby');
  // 当前图leave
  $(`.images > img:nth-child(${which(n)})`).removeClass('enter standby').addClass('leave');
  // 下一张图enter
  $(`.images > img:nth-child(${which(n + 1)})`).removeClass('standby leave').addClass('enter');
  // 圆点随之变化
  $(`.items > span:eq(${which(n + 1) - 1})`).addClass('active').siblings('.active').removeClass('active');
  n++;
}
// 返回应该播放的第x张图
function which(index) {
  if (index < 0) { index += 3; }  //解决负数返回错误的值。-3 -2 -1 => 0 1 2
  else if (index > 2) { index = index % 3; }
  return index + 1;       // 第 1/2/3 张图
}