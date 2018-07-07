let code_preword = `/*
 * 嗨，我是蔡嘉琳，你可以叫我菜包！
 * 初次见面，请多多指教！
 * 
 * 今天，我想把我（们）的童年回忆送给你
 * 它就是每次发动魔法时会喊
 * “隐藏着黑暗力量的钥匙啊！
 * 请在我面前显示你真正的力量，
 * 与你定下约定的小樱命令你
 * ——封印解除！”
 * 的小樱
 * 
 * 的好伙伴
 * 
 * 小可~~~ 哈哈哈哈哈哈哈
 */

 `,
  code_css = `
/* 
 * 首先，让代码狂给你腾出一个位置
 * 你就可以在下面看到变化了
 */
#code-wrapper {
  height: 50%;
}
.preview-wrapper {
  height: 50%;
  background-color: #f7b749;
}

/* 先定好头的位置 */
.head {
  width: 300px;
  height: 180px;
  padding: 10px 0;
}
/* 
 * 加个边框，让我们知道头在哪里
 * 然后让头里面的眼睛鼻子嘴巴
 * 全都在这个框框里定位
 */
.head {
  border: 1px solid #eee;
}

/* 我们先画它的小鼻子 */
.nose {
  width: 8px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
}
/* 让它放在居中偏上的位置 */
.nose {
  left: 50%;
  margin-left: -4px;
  top: 32px;
}

/* 然后画小可的眼睛 */
.eye {
  width: 40px;
  height: 30px;
  border-top: 3px solid black;
}
/* 让它们相对于鼻子对称放在两边 */
.eye.right {
  left: 50%;
  margin-left: 90px;
}
.eye.left {
  right: 50%;
  margin-right: 90px;
}
/* 然后让它们笑得眯起来~ */
.eye.left {
  border-top-left-radius: 60%;
  border-top-right-radius: 40%;
}
.eye.right {
  border-top-right-radius: 60%;
  border-top-left-radius: 40%;
}

/* 终于到最可爱的嘴巴啦~ */
/* 我们先把外面的头的框框去掉吧 */
.head {
  border: none;
}
/* 再给嘴巴一个框框 */
.mouth-wrapper {
  width: 100%;
  height: 120px;
  border: 1px solid #eee;
}
/*
 * 让它在鼻子的下面一点，
 * 并且跑出了这个框框的就不要它了
 */
.mouth-wrapper {
  top: 44px;
  overflow: hidden;
}

/* 首先是它的上唇 */
.lips::before, .lips::after {
  width: 34px;
  height: 16px;
  border: 2px solid black;
  border-top: none;
  top: -3px;
}
/* 同样，让它们对称互相挨着 */
.lips::before {
  right: 50%;
  border-right: none;
}
.lips::after {
  left: 50%;
  border-left: none;
}
/* 接着让它们噘起来~ */
.lips::before {
  transform: rotate(-36deg);
  border-bottom-left-radius: 88%;
}
.lips::after {
  transform: rotate(36deg);
  border-bottom-right-radius: 88%;
}

/* 
 * 它眼睛笑得这么弯，
 * 嘴巴一定也张得很大吧~
 */
.mouth-inner {
  width: 48px;
  height: 200px;
  border: 2px solid black;
  top: -81px;
  margin-left: -24px;
  border-radius: 50%;
  background-color: #e93222;
}
/* 
 * 嘴巴多出来那部分好丑哦
 * 赶紧弄掉！
 */
.mouth-inner {
  z-index: -1;
}
/* 还差舌头了！ */
.tongue {
  width: 48px;
  height: 90px;
  border: 2px solid black;
  bottom: 0;
  border-radius: 50%;
  border-bottom: none;
  background-color: #ee6d4e;
}
/* 同样，多出来的舌头要藏住哦 */
.mouth-inner {
  overflow: hidden;
}
/* 这样，嘴巴就做好啦~我们把框框去掉吧 */
.mouth-wrapper {
  border: none;
}


`,

  code_ending = `
/*
 * 大功告成~ 客官还满意否？
 * 
 * 小可，献给你，我喜欢的嘉
 * 
 * ❤
 * 
 *        —— 菜包 2018/7/7 
 */
`


writeCode(code_preword, '').then(() => {
  writeCode(code_css, code_preword).then(() => {
    writeCode(code_ending, code_preword + code_css)
  })
})

function writeCode(code, origin) {
  let n = 1
  return new Promise(resolve => {
    let id = setInterval(() => {
      console.log(n)
      $('#code-wrapper')[0].scrollTop = $('#code-wrapper')[0].scrollHeight;
      $('#code-wrapper')[0].innerHTML = Prism.highlight(origin + code.substr(0, n), Prism.languages.css, 'css');
      $('#styleTag')[0].innerHTML = origin + code.substr(0, n)
      if (n === code.length) {
        window.clearInterval(id)
        resolve.call(undefined)
      } else {
        n += 1
      }
    }, 1)
  })
}