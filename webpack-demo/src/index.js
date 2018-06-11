import _ from 'lodash';
import $ from 'jquery';
import x from './myFile';

function component() {
  var element = $('<div></div>');

  // Lodash, now imported by this script
  element.html(_.join(['Hello', 'webpack'], ' '));

  return element[0];
}

$('body').append(component());
alert(x());