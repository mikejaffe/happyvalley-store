/* $(document).ready(function () {
  $('.tabs').tabs()
}) */
document.addEventListener('DOMContentLoaded', function () {
  initTabs()
  initMobleSlideOut()
  initCartSlideOut()
  initDropDowns()
  initSelects()
})

function initMobleSlideOut() {
  var elems = document.querySelectorAll('.mobile-sidenav')
  var instances = M.Sidenav.init(elems, {})
}

function initCartSlideOut() {
  var elems = document.querySelectorAll('.cart-sidenav')
  const options = {
    edge: 'right',
  }
  var instances = M.Sidenav.init(elems, options)
}

function initTabs() {
  const el = document.querySelector('.tabs')
  const options = {
    duration: 200,
  }
  var instance = M.Tabs.init(el, options)
}

function initDropDowns() {
  var elems = document.querySelectorAll('.dropdown-trigger')
  const options = {
    coverTrigger: false,
  }
  var instances = M.Dropdown.init(elems, options)
}

function initSelects() {
  var elems = document.querySelectorAll('select')
  var instances = M.FormSelect.init(elems, {})
}
