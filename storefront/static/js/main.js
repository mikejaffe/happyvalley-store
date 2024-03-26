let slidersActive = false

document.addEventListener('DOMContentLoaded', function () {
  initTabs()
  initMobleSlideOut()
  initCartSlideOut()
  initDropDowns()
  initSelects()
  //initTippy() // tippy logic in cart.js
  initCollapsibles()
  initSearch()
  initMenuToggle()
  initCarousels()
  initProductsLayout()
  initModals()
  initSort()
  initBrandsSearch()
  //initInputMasks()

  initProductChart()

  bindUIActions()

})

function bindUIActions() {
  // show more button
  $('.mobile-tiles-showmore').on('click', function (e) {
    $(this).hide()
    $(this)
      .parent()
      .find('.tile-mobile-hide')
      .each(function (el) {
        $(this).removeClass('tile-mobile-hide')
      })
  })

  $('.modal-close-all').on('click', function () {
    $('.modal').modal('close')
  })
}

function initInputMasks() {
  let phoneInput = document.querySelector('.phone-mask')
  Inputmask({ mask: '(999) 999-9999', showMaskOnHover: false }).mask(phoneInput)

  let birthdayInput = document.querySelector('.birthday-mask')
  Inputmask({ alias: 'datetime', inputFormat: 'mm/dd/yyyy', showMaskOnHover: false }).mask(birthdayInput)
}

function initCollapsibles() {
  var elem = document.querySelectorAll('.collapsible')
  var instance = M.Collapsible.init(elem, {
    accordion: false,
  })
}

function initModals() {
  const options = {}
  var closedModal = M.Modal.init(document.querySelector('#closedModal'),{
    endingTop: '30%',
  })
  var menuModal = M.Modal.init(document.querySelector('#menuModal'), {
    endingTop: '30%',
  })
  var accountModals = M.Modal.init(document.querySelectorAll('.account-modal'), options)
  var reviewModal = M.Modal.init(document.querySelector('#review-modal'), options)
  var terpeneModals = M.Modal.init(document.querySelectorAll('.terpene-modal'), {
    opacity: 0,
    startingTop: 0,
    onOpenStart: populateTerpeneModal,
  })
}

function populateTerpeneModal(modal, e) {
  const desc = $(e).data('description')
  const title = $(e).data('title')
  const aromas = $(e).data('aromas')
  const iconName = $(e).data('icon')
  const imgSrc = `/images/${iconName}.svg`
  $(modal).find('.modal-terpene-icon').attr('src', imgSrc)
  $(modal).find('.modal-terpene-title').text(title)
  $(modal).find('.modal-terpene-desc').text(desc)
  $(modal).find('.modal-terpene-aromas').text(aromas)
}

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
    alignment: 'left',
  }
  var instances = M.Dropdown.init(elems, options)
}

function initSelects() {
  var elems = document.querySelectorAll('select')
  const options = {
    dropdownOptions: {
      container: 'body',
    },
  }
  var instances = M.FormSelect.init(elems, options)
}

function initTippy() {
  // add to cart popup
  tippy('[data-toggle="tippy-dropdown"]', {
    allowHTML: true,
    appendTo: document.body,
    content(reference) {
      const templateId = reference.getAttribute('data-template')
      const template = document.getElementById(templateId)
      return template ? template.innerHTML : ''
    },
    interactive: true,
    trigger: 'click',
    duration: 100,
    //hideOnClick: 'toggle',
    placement: 'top-end',
    //offset: [0, -2],
    maxWidth: 'none',
    onShow(instance) {
      tippy.hideAll()
      populatePopup(instance)
    },
  })
}

function populatePopup(instance) {
  const reference = instance.reference
  const popup = instance.popper
  let imgSrc = $(reference).closest('.product-list-item').find('img').attr('src')
  let productName = $(reference).closest('.product-list-item').find('.product-name').text()
  let productPrice = $(reference).data('price')
  let productWeight = $(reference).data('weight')
  $(popup).find('.popup-item-img').attr('src', imgSrc)
  $(popup).find('.popup-item-name').text(productName)
  $(popup).find('.popup-item-weight').text(productWeight)
  $(popup).find('.popup-item-price-value').text(productPrice)
}

function initSearch() {
  /* const searchBtn = document.querySelectorAll('.search-button')
  searchBtn.addEventListener('click', searchToggle) */
  $('.search-button').on('click', searchToggle);
  $('.msearch .search-button').on('click', searchToggleMobile);
  $('.search-fields #search').on('keypress', function(e){
    if(e.which == 13){
        location.href = "/search?search=" + $(".search-fields #search").val();
    }
  });

  $('.search-fieldsm #searchm').on('keypress', function(e){
    if(e.which == 13){
        location.href = "/search?search=" + $(".search-fieldsm #searchm").val();
    }
  });

 /*  const searchCancelBtn = document.querySelector('.search-cancel-btn')
  searchCancelBtn.addEventListener('click', cancelSearch) */
  $('.search-cancel-btn').on('click', cancelSearch);

  if ($('.search-field').val() !== '') {
    showCancelButton()
  } else {
    hideCancelButton();
  }

  // clear search
  $('.clear-search').on('click', () => {
    $('[name="search"]').val('').closest('form').submit()
  })

  $('.search-field').on('blur', resetSearch)
  $('.search-field').on('keyup', showCancelButton)
}

function resetSearch(e) {
  if (this.value == '') {
    $('.search-button').trigger('click')
    document.querySelector(".sales-label").classList.remove('hide');
  }
}

function cancelSearch() {
  window.location = "/search?search="
  $('.search-field').val('')
  hideCancelButton();
}

function showCancelButton() {
  $('.search-cancel-btn').removeClass('hidden')
}

function hideCancelButton() {
  $('.search-cancel-btn').addClass('hidden')
}

function searchToggleMobile(e) {
  
  $(".mstore-list").toggle()
  $(".mobile-search-panel").toggle()
 
  // if($(".search-fieldsm #searchm").val() == "") {
  //   debugger;
  //   $(".search-fieldsm").toggle(function(){
  //     if(  $(".search-fieldsm").is(":visible") ) {
  //        $(".search-fieldsm #searchm").focus();
  //        $(".mobile-nav").css("height","107px");
  //      } else {
  //       $(".mobile-nav").css("height","63px");
  //      }
  //   });


   
  // } else {
    //location.href = "/search?search=" + $(".search-fieldsm #searchm").val();
  //}
  // const $searchForm = $(e.target).closest('.search-wrapper').find('.search-container');
  // const searchBtn = e.currentTarget
  // document.querySelector(".sales-label").classList.remove('hide');
  // if ($searchForm.hasClass('hide')) {
  //   $searchForm.removeClass('hide')
  //   searchBtn.classList.add('hide')
  //   document.querySelector('.search-field').focus()
  //   document.querySelector(".sales-label").classList.add('hide')
  // } else {
  //   $searchForm.addClass('hide')
  //   searchBtn.classList.remove('hide')
  // }
}

function searchToggle(e) {
 
  if($(".search-fields #search").val() == "") {
    $(".search-fields").toggle(function(){
      if(  $(".search-fields").is(":visible") ) {
         $(".search-fields #search").focus(); 
       }  
    });


   
  } else {
    location.href = "/search?search=" + $(".search-fields #search").val();
  }
  // const $searchForm = $(e.target).closest('.search-wrapper').find('.search-container');
  // const searchBtn = e.currentTarget
  // document.querySelector(".sales-label").classList.remove('hide');
  // if ($searchForm.hasClass('hide')) {
  //   $searchForm.removeClass('hide')
  //   searchBtn.classList.add('hide')
  //   document.querySelector('.search-field').focus()
  //   document.querySelector(".sales-label").classList.add('hide')
  // } else {
  //   $searchForm.addClass('hide')
  //   searchBtn.classList.remove('hide')
  // }
}

function initMenuToggle() {
  // modal continue click handle

  // $('.btn-menu-continue').on('click', () => {
  //   updateMenu('Recreational', 'RECREATIONAL')
  // })


  $(window).resize(function () {
    updateCurrentMenuText()
  })

  // set value
  const menuCookie = document.cookie.split('; ').find((row) => row.startsWith('menu_type='))
  let menuType = 'RECREATIONAL'

  if (menuCookie) {
    menuType = menuCookie.split('=')[1]
  }

  let menuString = 'Recreational'
  const winWidth = window.innerWidth
  switch (menuType) {
    case 'MEDICAL':
      menuString = winWidth > 520 ? 'Medical' : 'Med'
      break

    case 'RECREATIONAL':
      menuString = winWidth > 520 ? 'Recreational' : 'Rec'
      break
  }
  $('.current-menu').text(menuString)
  $('.menu-toggle').on('click', setMenuType)
}

function updateCurrentMenuText() {
  const winWidth = window.innerWidth
  const menuCookie = document.cookie.split('; ').find((row) => row.startsWith('menu_type='))
  let menuType = 'RECREATIONAL'
  let menuString = 'Recreational'
  if (menuCookie) {
    menuType = menuCookie.split('=')[1]
  }

  //menuText = menuText = winWidth > 520 ? menuText : menuText.substr(0, 3)
  switch (menuType) {
    case 'MEDICAL':
      menuString = winWidth > 520 ? 'Medical' : 'Med'
      break

    case 'RECREATIONAL':
      menuString = winWidth > 520 ? 'Recreational' : 'Rec'
      break
  }
  $('.current-menu').text(menuString)
}

function setMenuType(e) {
  const menuType = e.currentTarget.dataset.menu
  const menuText = e.currentTarget.textContent
  const currentMenu = document.querySelector('.current-menu').innerText

  if (currentMenu == 'Medical' || currentMenu == 'Med') {
    if (M.Modal.getInstance(document.querySelector('#menuModal'))) {
      M.Modal.getInstance(document.querySelector('#menuModal')).open()
    } else {
      updateMenu(menuText, menuType)
    }
  } else {
    updateMenu(menuText, menuType)
  }
}

function updateMenu(menuText, menuType) {
  // trim length on mobile
  const winWidth = window.innerWidth
  menuText = winWidth > 520 ? menuText : menuText.substr(0, 3)

  // update menu type text
  $('.current-menu').text(menuText)

  // set cookie
  setCookie('menu_type', menuType, 30)

  window.location.reload()
}

function initProductsLayout() {
  $('.layout-option').on('click', setLayoutType)

  // set layout type to last type (localStorage)
  const layoutType = localStorage.getItem('productsLayout') || 'list'

  if ($('[data-target="layoutDropdown"]').length > 0) {
    $('[data-layout="' + layoutType + '"]').trigger('click')
  }
}

function setLayoutType(e) {
  const layoutType = e.currentTarget.dataset.layout

  // update menu type text
  $('.selected-layout').html(e.currentTarget.querySelector('.layout-toggle').innerHTML)

  // update products-list
  $('.products-list')
    .removeClass(['layout-grid', 'layout-list'])
    .addClass('layout-' + layoutType)

  // set localStorage
  localStorage.setItem('productsLayout', layoutType)
}

function setCookie(cName, cValue, expDays) {
  let date = new Date()
  date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000)
  const expires = 'expires=' + date.toUTCString()
  document.cookie = cName + '=' + cValue + '; ' + expires + '; path=/'
}

function initSort() {
  let options = {
    valueNames: ['price', 'potency', 'productName', 'popularKey'],
  }
  try {
    // let productList = new List('products-list', options)

    // // sort desc by default
    // productList.sort('price', { order: "desc" });

    $('[name="products_sort"]').on('change', function (e) {
      const sortType = e.target.value;
      const queryString = window.location.search.replace("?1=1","");
      const urlParams = new URLSearchParams(queryString);
      const entries = urlParams.entries();

      var new_search = "";
      for(const entry of entries) {
        if(entry[0] != 'sort') {
          new_search += "&" + entry[0] + "=" + entry[1];
        }
      }
      new_search += "&sort=" + sortType;
      location.href = "?1=1" + new_search;
    })
  } catch (err) {}
}
/*
function updateSort(e) {
  console.log(e.target.value)
} */

function initBrandsSearch() {
  let options = {
    valueNames: ['brand-name'],
  }
  try {
    let brandsList = new List('brands-search', options)
  } catch (err) {}
}

function initCarousels() {

  let carousels = [];
  let categorySlider = null;

  // create global carousels (desktop and mobile)
  createCarousels();

  // resize handler for creating/destroying desktop-only carousels (category slider)
  $(window).resize(function () {
    checkWindowWidth()
  })

  checkWindowWidth()

  function createDesktopCarousels() {
    if (document.querySelector('.carousel-slider-gradient-container')) {
      slidersActive = true;
      categorySlider = tns({
        container: '.category-slider',
        items: 5,
        slideBy: "page",
        nav: false,
        loop: false,
        gutter: 0,
        prevButton: '.slick-prev',
        nextButton: '.slick-next',
        responsive: {
          640: {
            edgePadding: 0,
            gutter: 0,
            items: 2
          },
          700: {
            gutter: 0
          },
          900: {
            items: 5
          }
        }
      });

      categorySlider.events.on('indexChanged', sliderTransitionHandler);

      // remove function binding
      //slider.events.off('transitionEnd', sliderIndexChangedHandler);
      carousels.push(categorySlider)
    }
  }

  function sliderTransitionHandler(info, event) {
    console.log(arguments)
    const prevButton = info.prevButton
    const nextButton = info.nextButton
    let $parent = $(nextButton).closest('.slider-arrows')

    if (prevButton.disabled) {
      $parent.addClass('prev-disabled');
    } else {
      $parent.removeClass('prev-disabled');
    }

    if (nextButton.disabled) {
      $parent.addClass('next-disabled');
    } else {
      $parent.removeClass('next-disabled');
    }
  }

  function createCarousels() {
    if (document.querySelector('.carousel-slider-gradient-container')) {
      var staffSlider = tns({
        container: '.staff-slider',
        items: 2,
        slideBy: 2,
        nav: false,
        loop: false,
        gutter: 0,
        prevButton: '.staff-slick-prev',
        nextButton: '.staff-slick-next',
        autoWidth: true,
        responsive: {
          540: {
            items: 3,
          },
          640: {
            edgePadding: 0,
            gutter: 0,
            items: 3
          },
          700: {
            gutter: 0
          },
          900: {
            slideBy: 4,
            gutter: 0,
            items: 5
          }
        }
      });
      staffSlider.events.on('indexChanged', sliderTransitionHandler);
      //carousels.push(staffSlider)

      var highTimesSlider = tns({
        container: '.high-times-slider',
        items: 2,
        slideBy: 2,
        nav: false,
        loop: false,
        gutter: 20,
        prevButton: '.high-times-slick-prev',
        nextButton: '.high-times-slick-next',
        autoWidth: true,
        responsive: {
          540: {
            items: 3,
          },
          640: {
            edgePadding: 0,
            gutter: 0,
            items: 3
          },
          700: {
            gutter: 0
          },
          900: {
            slideBy: 4,
            gutter: 0,
            items: 5
          }
        }
      });

      highTimesSlider.events.on('indexChanged', sliderTransitionHandler);
      //carousels.push(highTimesSlider)

      $('.popular-slider').each(function () {
        const sliderName = $(this).data('name')

        var popularSlider = tns({
          container: `.${sliderName}-slider`,
          items: 2,
          slideBy: 2,
          nav: false,
          loop: false,
          gutter: 20,
          autoWidth: true,
          prevButton: `.popular-slick-prev-${sliderName}`,
          nextButton: `.popular-slick-next-${sliderName}`,
          preventScrollOnTouch: "auto",
          mouseDrag: true,
          responsive: {
            540: {
              items: 3,
            },
            640: {
              edgePadding: 0,
              gutter: 0,
              items: 3
            },
            700: {
              gutter: 0
            },
            900: {
              slideBy: 4,
              gutter: 0,
              items: 5
            }
          }
        });
        popularSlider.events.on('indexChanged', sliderTransitionHandler);
        //carousels.push(popularSlider)
      })
    }
  }

  /* function rebuildCarousels() {
    carousels.forEach(function(carousel) {
      carousel.rebuild();
    })
  } */

  function disableDesktopCarousels() {
    categorySlider.destroy()
    /* carousels.forEach(function(carousel) {
      carousel.destroy();
    })

    carousels = []; */
  }

  function checkWindowWidth() {

    if ($(window).width() >= 600 && !slidersActive) {
      slidersActive = true
      setTimeout(() => {
        createDesktopCarousels()
      }, 200)
    }

    if ($(window).width() < 600 && slidersActive) {
      slidersActive = false
      disableDesktopCarousels()
    }
  }
}

function initSlickCarousels() {
  slidersActive = true
  // glide
  /* const options = {
    type: 'slider',
    startAt: 0,
    perView: 4,
    peek: { before: 0, after: 100 },
    rewind: false,
    gap: 28,
    bound: true,
  }
  let sliderCategories = new Glide('.slider-categories', options).mount()
  let sliderStaffPicks = new Glide('.slider-staffpicks', options).mount() */

  // slick
  $('.category-slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: '.slick-prev',
    nextArrow: '.slick-next',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  })
  $('.category-slider').on('afterChange', sliderChangeEventHandler)

  $('.staff-slider').slick({
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    prevArrow: '.staff-slick-prev',
    nextArrow: '.staff-slick-next',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  })

  $('.staff-slider').on('afterChange', sliderChangeEventHandler)

  // high times slider
  /* const highTimesSlides = $('.high-times-slider').children().length
  if (highTimesSlides > 4) { */
    $('.high-times-slider').slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      prevArrow: '.high-times-slick-prev',
      nextArrow: '.high-times-slick-next',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 620,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    })

    $('.high-times-slider').on('afterChange', sliderChangeEventHandler)
  /* } */

  // popular sliders
  $('.popular-slider').each(function () {
    const sliderName = $(this).data('name')
    const prevElem = $('.popular-slick-prev-' + sliderName)
    const nextElem = $('.popular-slick-next-' + sliderName)

    $(this).slick({
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      prevArrow: prevElem,
      nextArrow: nextElem,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 620,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          },
        },
      ],
    })

    $(this).on('afterChange', sliderChangeEventHandler)
  })
}

function sliderChangeEventHandler(e, slide, currentSlide) {
  let $parent = slide['$nextArrow'].closest('.slick-arrows')
  if (slide['$nextArrow'].hasClass('slick-disabled')) {
    $parent.addClass('next-disabled').removeClass('prev-disabled')
  }
  if (slide['$prevArrow'].hasClass('slick-disabled')) {
    $parent.addClass('prev-disabled').removeClass('next-disabled')
  }
}



function initProductChart() {
  if ($('.terpene-item').length > 0) {
    // set up chart data and initialize
    let terpenesData = []
    let terpenesLabels = []

    $('.terpene-item').each(function (item) {
      if ($(this).data('value') > 0) {
        const colorClass = $(this).data('icon').split(' ').join('')
        terpenesLabels.push($(this).data('title'))
        terpenesData.push({
          value: $(this).data('value'),
          className: `terpene-item terpene-${$(this).data('id')} color-${colorClass}`,
          name: $(this).data('title'),
        })
      }
    })

    var data = {
      labels: terpenesLabels,
      series: terpenesData,
    }

    // Create a new line chart object where as first parameter we pass in a selector
    // that is resolving to our chart container element. The Second parameter
    // is the actual data object.
    let chart = new Chartist.Pie('.ct-chart', data, {
      donut: true,
      showPoint: false,
      showLabel: false,
    })

    // set up hover handler
    $('.terpenes-list-container').on('mouseover', '.terpene-item', selectTerpene)
    $('.terpenes-list-container').on('mouseout', '.terpene-item', resetAllTerpenes)
    $('.ct-chart').on('click', '.terpene-item', openTerpeneModal)
  }
}

function openTerpeneModal(e) {
  const $terpene = $(e.currentTarget)
  const terpeneName = $terpene.attr('ct:series-name')
  const link = document.querySelector(`[data-title="${terpeneName}"]`)
  link.click()
}

function selectTerpene(e) {
  const $item = $(e.currentTarget)
  const terpeneName = $item.data('title') || $item.attr('ct:series-name')
  const terpeneValue = $('[data-title="' + terpeneName + '"]').data('value')

  // ignore values of 0
  if (terpeneValue > 0) {
    renderTerpeneChartDetails({
      terpeneName,
      terpeneValue,
    })

    highlightSelectedTerpene(terpeneName)
  }
}

function highlightSelectedTerpene(terpeneName) {
  const selectedName = terpeneName

  resetTerpeneHighlights()

  // update
  $('.terpene-item').each(function () {
    const itemName = $(this).data('title') || $(this).attr('ct:series-name')
    if (itemName == selectedName) {
      $(this).addClass('active-terpene')
    } else {
      $(this).addClass('inactive-terpene')
    }
  })
}

function resetAllTerpenes() {
  resetChartDetails()
  resetTerpeneHighlights()
}

function resetTerpeneHighlights() {
  // remove all active/inactive classes
  $('.terpene-item').each(function(){
    $(this).removeClass('inactive-terpene');
    $(this).removeClass('active-terpene');
  });
}

function resetChartDetails() {
  $('.chart-terpene-name').text('')
  $('.chart-terpene-value').text('')
  $('.chart-details-mobile').removeClass('hide')
}

function renderTerpeneChartDetails(data) {
  const { terpeneName, terpeneValue } = data
  $('.chart-terpene-name').text(terpeneName)
  $('.chart-terpene-value').text(terpeneValue + '%')

  $('.chart-details-mobile').addClass('hide')
}

$('.products-list .product-item,[data-template="addedToCartTemplate"]').on('click', function(e) {

    var product = $(this);
    var href = product.attr('href');
    var hasHref = (href != null);
    var ecommerceObject;
    var productArray = [{
        'item_name': product.attr('data-name'), // Name or ID is required.
        'item_id': product.attr('data-id'),
        'price': product.attr('data-price'),
        'item_category': product.attr('data-category'),
        'item_list_name': product.attr('data-category'),
        'index': 1
    }]
    if (hasHref == true) {
       e.preventDefault();
        ecommerceObject = {
            'ecommerce': {
                'items': productArray
            },
            'event': 'select_item', // Create custom event.
            'item_list_name': product.attr('data-category')
        }
    } else {
        ecommerceObject = {
            'ecommerce': {
                'items': productArray
            },
            'event': 'add_to_cart',
	          'currency': 'USD',
        }
    }

   if(window.dataLayer) {
    window.dataLayer.push({
        'ecommerce': null
    });
    window.dataLayer.push(ecommerceObject);
    if (hasHref == true) {
        setTimeout(function() { window.location.href = href; }, 250)
    };
   }
});

function goToHV(obj) {
  if(obj.value.indexOf("menuType=rec") > 0) {
    $("#goToContinue").val(obj.value);
    $("#goToCancel").val(obj.value.replace("menuType=rec","menuType=med"));
    $(".btn-menu-continue").on('click',function(){
      document.cookie = 'order_id=; Max-Age=0'
      location.href = obj.value;
    });
    $(".modal-close").on('click',function(){
      location.href = obj.value.replace("menuType=rec","menuType=med");
    });
    M.Modal.getInstance(document.querySelector('#menuModal')).open()
  } else {
    if(obj.value.indexOf('boston_delivery') > -1) {
      window.open(obj.value);
    } else {
      location.href = obj.value;
    }
  }

}





