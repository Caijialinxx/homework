var intervalId = intervalSlide(), n = 0;
var imgItems = $('.images').find('img');
var btnItems = $('.items').find('span');

// 上一张
$(prev).click(() => {
  clickSlide(n - 2);
});
// 下一张
$(next).click(() => {
  clickSlide(n);
});
// 圆点导航
$(btnItems).click((e) => {
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
  }, 1000);
}
// 播放一次的动画函数
function slide() {
  // 上一张图standby
  imgItems.eq(which(n - 1)).removeClass('leave enter').addClass('standby');
  // 当前图leave
  imgItems.eq(which(n)).removeClass('enter standby').addClass('leave');
  // 下一张图enter
  imgItems.eq(which(n + 1)).removeClass('standby leave').addClass('enter');
  // 圆点随之变化
  btnItems.eq(which(n + 1)).addClass('active').siblings('.active').removeClass('active');
  n++;
}
// 返回应该播放的第x张图
function which(index) {
  if (index < 0) { index += 3; }  //解决负数返回错误的值。-3 -2 -1 => 0 1 2
  return index % imgItems.length;
}