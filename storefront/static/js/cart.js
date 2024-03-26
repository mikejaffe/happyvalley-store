var HV = HV || {}

HV.cart = (function ($) {
  let hasLaunchedClosedModal = false
  let lastOrder = {
    event: null,
    callback: null
  }

  $(document).ready(function () {
    initCart();
  })

  function initCart() {
    fetchCart()
    bindUI()
  }

  function bindUI() {

    // remove product handler
    $('.cart-sidenav').on('click', '.btn-cart-remove', removeFromCart)

    // update quantity handler
    $('.cart-sidenav').on('change', '.cart-item-quantity', updateProductQuantity)

    // product page - add to cart handler
    //$('#product-form ').on('submit', productAddToCartHandler)
    $('#product-form').on('submit',(e) => {
      checkStoreHours(e, productAddToCartHandler)
    })

    // products list - tile
    //$('.product-option-tile').on('click', productVariantAddToCartHandler)
    $('.product-option-tile').on('click', (e) => {
      checkStoreHours(e, productVariantAddToCartHandler)
    })

    $(".related-item").on('click',(e) => {
      checkStoreHours(e, quickAddToCart)
    })

    $(".related-item-cart").on('click',(e) => {
      checkStoreHours(e, quickAddToCart)
    })

    $(document).ajaxStart(showLoader)
    $(document).ajaxComplete(hideLoader)
    // the "we're closed" continue with order button click handler
    $('.btn-closed-continue').on('click', continueOrder)
  }

  function getMenuType() {
    const menuCookie = document.cookie.split('; ').find(row => row.startsWith('menu_type='))

    if (menuCookie) {
      return menuCookie.split('=')[1]
    } else {
      return 'RECREATIONAL'
    }
  }

  function shouldDisplayClosedModal() {
    const menuType = getMenuType()
    if (!isStoreOpen && !hasLaunchedClosedModal) {
      return true
    } else {
      return false
    }
  }

  function checkStoreHours(e, callback) {
    e.preventDefault();


    if (shouldDisplayClosedModal()) {
      lastOrder.event = e
      lastOrder.callback = callback
      $('#closedModal').modal('open')
    } else {
      callback(e)
    }
  }

  function continueOrder() {
    $('#closedModal').modal('close')
    hasLaunchedClosedModal = true
    const { event, callback } = lastOrder
    if (callback) {
      callback(event)
    }
  }

  function productAddToCartHandler(e) {
    e.preventDefault()
    const postData = {
      product_id: $('[name="product_id"]').val(),
      pricing_type: $('[name="pricing_type"]').val(),
      order_type: $('[name="order_type"]').val(),
      quantity: $('[name="quantity"]').val(),
      option: $('[name="option"]').val(),
      buynow: $('[name="buynow"]').val()
    }

    const tippyData = {
      productName: $('.product-info-container').find('.product-name').text(),
      productWeight: $('[name="option"]:checked').val(),
      productPrice: $('[name="option"]:checked').data('price'),
      imgSrc: $('.product-thumb').attr('value'),
    }

    addToCart(postData, '.button-product-add-cart', tippyData)
  }

  function quickAddToCart(obj) {
    tgt = obj.target;
    itemButtonCls = '.related-item';
    if($(obj.target).hasClass('related-item-cart')) {
      itemButtonCls = '.related-item-cart';
    }
    
    const postData = {
      product_id: $(tgt).data("product_id"),
      pricing_type: $(tgt).data("pricing_type"),
      order_type: $(tgt).data("order_type"),
      quantity: $(tgt).data("quantity"),
      option: $(tgt).data("option"),
      buynow: 0
    }
    const tippyData = {
      productName: $(tgt).data('product_name'),
      productWeight:  $(tgt).data("option"),
      productPrice: $(tgt).data("price"),
      imgSrc: $(tgt).data("image")
    }
     addToCart(postData, '.' + $(tgt).data("template") + '_item'+$(tgt).data("product_id")+itemButtonCls, tippyData)
  }


  function productVariantAddToCartHandler(e) {
    let btnElem = $(e.target)
    const postData = {
      product_id: btnElem.data('id'),
      pricing_type: 'RECREATIONAL', // update via cookie
      order_type: 'PICKUP',
      quantity: 1,
      option: btnElem.data('weight').length > 0 ?  btnElem.data('weight') : 'N/A',
      buynow: 0,
    }

    const tippyData = {
      productName: btnElem.closest('.product-list-item').find('.product-name').text(),
      productWeight: btnElem.data('weight'),
      productPrice: btnElem.data('price'),
      imgSrc: btnElem.closest('.product-list-item').find('img').attr('src'),
    }

    addToCart(postData, '[data-id="' + btnElem.data('id') + '"][data-price="' + btnElem.data('price') + '"]', tippyData)
  }

  function addToCart(postData, buttonSelector, tippyData) {
    if (!postData) {
      return
    }
    $button = $(buttonSelector)

    $.ajax({
      dataType: 'text html',
      url: '/add-to-cart',
      method: 'post',
      data: postData,
      beforeSend: function (response) {
        if(postData.buynow != "1") {
          $button.addClass('loading')
        }
      },
      success: function (response) {
        if(postData.buynow == "1") {
          location.href = JSON.parse(response)["url"];
        } else {
          renderUpdatedCart(response)
          createTippy(buttonSelector, tippyData, response)
        } 
      },
      error: function (XHR, textStatus, errorThrown) {
        //alert(XHR.status)
        alert(XHR.responseText)
      },
      complete: function (response) {
        $button.removeClass('loading');
      },
    })
  }

  function fetchCart() {
    $.post('/fetch-cart', {"csrfmiddlewaretoken":$("input[name=csrfmiddlewaretoken]").val()}, ).done(function(response){
      renderUpdatedCart(response)
    });
  }

  function removeFromCart(e) {
    const itemId = $(this).data('id')
    $.ajax({
      dataType: 'text html',
      url: '/remove-from-cart',
      method: 'post',
      data: {
        item_id: itemId,
      },
      success: function (response) {
        renderUpdatedCart(response);
      },
      error: function (XHR, textStatus, errorThrown) {
        //alert(XHR.status)
        alert(XHR.responseText)
      },
    })
  }

  function updateProductQuantity(e) {
    const itemId = $(this).data('id')
    const itemQuantity = parseInt($(this).val())
    e.preventDefault()
    $.ajax({
      dataType: 'text html',
      url: '/update-quantity',
      method: 'post',
      data: {
        item_id: itemId,
        quantity: itemQuantity,
      },
      success: function (response) {
        renderUpdatedCart(response)
      },
      error: function (XHR, textStatus, errorThrown) {
        //alert(XHR.status)
        alert(XHR.responseText)
      },
    })
  }

  // REMOVE
  function recalculateCart() {
    let cartTotal = 0
    $('.cart-item').each(function () {
      let weightCost = $(this).find('[name="item_weight"] option:selected').data('cost')
      let quantity = $(this).find('[name="item_quantity"] option:selected').val()

      let itemSubtotal = Math.ceil((parseFloat(weightCost) * parseInt(quantity) * 100) / 100)

      $(this)
        .find('[data-amount="item-subtotal"]')
        .text('$' + itemSubtotal)

      cartTotal += itemSubtotal
    })

    $('[data-amount="cart-subtotal"]').text('$' + cartTotal)
  }

  function renderUpdatedCart(data) {
    $('#cart-slide-out .cart-container').replaceWith($(data).find('.cart-container'));
    $(".related-item-cart").on('click',(e) => {
      checkStoreHours(e, quickAddToCart)
    })
    initSelects()
    updateCartCount()
  }

  function updateCartCount() {
    // update cart count
    let $cartCountButton = $('.button-cart')
    let $allCartButtons = $('[data-button="cart"]');
    let total = 0
    $('.cart-item-quantity').each(function () {
      total += parseInt($(this).val())
    })
    $allCartButtons.find('.cart-count').text(total)

    // check if style of cart button in top navbar needs updating
    if (total == 0 && $cartCountButton.hasClass('has-items')) {
      $allCartButtons.removeClass('has-items')
    }

    if (total > 0 && !$cartCountButton.hasClass('has-items')) {
      $allCartButtons.addClass('has-items')
    }
  }

  function initSelects() {
    var elems = document.querySelectorAll('.cart-item-quantity')
    M.FormSelect.init(elems, {})
  }

  function showLoader() {
    $('.minicart-loader').removeClass('hide')
  }

  function hideLoader() {
    $('.minicart-loader').addClass('hide')
  }

  /** Tippy */
  function createTippy(buttonSelector, data, resp) {
    // add to cart popup
    data.checkoutLink = $(resp).find('.btn-checkout').attr('href')
    tippy(buttonSelector, {
      allowHTML: true,
      appendTo: document.body,
      content(reference) {
        const template = document.getElementById('addedToCartTemplate')
        return template ? template.innerHTML : ''
      },
      interactive: true,
      trigger: 'click',
      duration: 100,
      placement: 'top-end',
      //offset: [0, -2],
      maxWidth: 'none',
      showOnCreate: true,
      onShow(instance) {
        tippy.hideAll()
        populateTippyInstance(instance, data)
        setTimeout(() => {
          instance.hide()
        }, 4000)
      },
      onHidden(instance) {
        destroyTippyInstance(instance)
      },
    })
  }

  function populateTippyInstance(instance, data) {
    const { productWeight, productPrice, imgSrc, productName, checkoutLink } = data
    const popup = instance.popper
    const cartTotal = $('#cartTotal').val()

    $(popup).find('.popup-item-img').attr('src', imgSrc)
    $(popup).find('.popup-item-name').text(productName)
    $(popup).find('.popup-item-weight').text(productWeight)
    $(popup).find('.popup-item-price-value').text(productPrice)
    $(popup).find('.popup-cart-total').text(cartTotal)
    $(popup).find('.btn-popup-checkout').attr('href', checkoutLink)
  }

  function destroyTippyInstance(instance) {
    instance.destroy()
  }
})($)
