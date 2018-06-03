$(btn).click(function () {
  $(win).toggleClass('active')
  setTimeout(function () {
    $(document).one('click', function () {
      $(win).removeClass('active')
    })
  }, 0)
})
$('.wrapper').click(function (e) {
  e.stopPropagation()
})