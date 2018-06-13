import _ from 'lodash'
import $ from 'jquery'
import './style.css'

function component() {
  var element = $('<div></div>')
  element.html(_.join(['Hello', 'webpack'], ' '))
  element.addClass('hello')
  
  return element[0]
}

$('body').append(component())