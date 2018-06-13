import _ from 'lodash'
import $ from 'jquery'
import './style.css'
import img from './webpack-v.svg'

function component() {
  var element = $('<div></div>')
  element.html(_.join(['Hello', 'webpack'], ' '))
  element.addClass('hello')

  var version = new Image()
  version.src = img
  element.append(version)

  return element[0]
}

$('body').append(component())