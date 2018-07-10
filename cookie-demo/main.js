$('#signup').submit((e) => {
  e.preventDefault();
  let hash = {}
  let neededInfo = ['email', 'password', 'password_confirmation']
  neededInfo.forEach((name) => {
    let value = $('form').find(`[name=${name}]`).val()
    hash[name] = value
  })
  $.post('./signup.html', hash).then(() => {
    window.location.href = './login.html'
    console.log('Sign up successfully!')
  }, (err) => { console.error(err) })
})

$('#login').submit((e) => {
  e.preventDefault();
  let hash = {}
  let neededInfo = ['email', 'password']
  neededInfo.forEach((name) => {
    let value = $('form').find(`[name=${name}]`).val()
    hash[name] = value
  })
  $.post('./login.html', hash).then(() => {
    window.location.href = '/'
    console.log('Login successfully!')
  }, (err) => { console.error(err) })
})