var intervalId, n = 0;
setInterval(() => {
  // 第一张图leave，并进入standby状态
  $(`img:nth-child(${which(n)})`).removeClass('enter standby').addClass('leave').one('transitionend', (e) => {
    $(e.target).removeClass('leave enter').addClass('standby');
  });
  // 第二张图enter，并去除standby状态
  $(`img:nth-child(${which(n + 1)})`).removeClass('standby leave').addClass('enter');
  n++;
}, 3000);

function which(turns) {
  if (turns > 2) {
    turns = turns % 3;
  }
  return turns + 1;
}