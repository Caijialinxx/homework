import _ from 'lodash';
import $ from 'jquery';
import x from './myFile';     // 引入自己的文件
import './style.css';         // 引入CSS
import svg from './logo.svg'; // 引入图片

function component() {
  var element = $('<div></div>');

  // Lodash, now imported by this script
  element.html(_.join(['Hello', 'webpack'], ' '));
  element.addClass('hello');
  // Add the image to div
  var logo = new Image();
  logo.src = svg;
  element.append(logo);

  return element[0];
}

$('body').append(component());
console.log(x());