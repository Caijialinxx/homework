import _ from "lodash"

function component() {
  let span = document.createElement('span')
  span.innerHTML = _.join(['Hello', 'webpack'], ' ')

  return span
}

document.body.appendChild(component())