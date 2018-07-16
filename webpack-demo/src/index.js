import _ from "lodash";
import './style.css'

function component() {
  let span = document.createElement('span')
  span.innerHTML = _.join(['Hello', 'webpack'], ' ')
  span.className = 'hello'

  let wrapper = document.createElement('div')
  wrapper.appendChild(span)
  wrapper.className = 'wrapper'

  return wrapper
}

document.body.appendChild(component())