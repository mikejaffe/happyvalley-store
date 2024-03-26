var HV = HV || {}

HV.filters = (function ($) {
  let listData = null
  let thcSlider = null
  let cbdSlider = null
  let mobileThcSlider = null
  let mobileCbdSlider = null

  $(document).ready(function () {
    initFilters()
  })

  function initFilters() {
    listData = $('.product-list-item ') // yean I know, mixing jQuery...
    bindUI()
  }

  function bindUI() {
  
    // weight radio group filters
    $('input[name="weight"]').on('click', toggleWeight)
    $('.tiers').on('click', toggleTiers)
    $('input[name="weight"]').on('change', setActiveWeight)

    $('.btn-apply-filters').on('click', () => {
      filterListings("mobile")
      const elem = document.querySelector('.filters-modal')
      const filtersModal = M.Modal.getInstance(elem)
      filtersModal.close()
    })
    $('.btn-reset-filters').on('click', resetFilters)

    // TCH / CBD range slider filters
    initSliders()
    initMobileSliders()
    initMobileFiltersSlideout()
  }

  function initMobileFiltersSlideout() {
    let options = {
      endingTop: '0',
      startingTop: '-100%'
    }
    var elems = document.querySelectorAll('.filters-modal');
    var instances = M.Modal.init(elems, options);
    /* var elems = document.querySelectorAll('.filters-sidenav')
    const options = {
      edge: 'top',
    }
    var instances = M.Sidenav.init(elems, options) */

  }

  function resetFilters() {
    mobileThcSlider.noUiSlider.set([0, 100]);
    mobileCbdSlider.noUiSlider.set([0, 100]);
    $('input[name="weight"]').prop('checked', false)
    filterListings("mobile")
  }

  function setActiveWeight(e) {
    // $('[name="weight"]').removeClass('active')
    // $('[name="weight"]:checked').addClass('active')
  }

  function toggleWeight(e) {
    // let isActive = $(this).hasClass('active')

    // if (isActive) {
    //   $(this).prop('checked', false)
    //   $(this).removeClass('active')
    // }
    const queryString = window.location.search.replace("?1=1","");
    const urlParams = new URLSearchParams(queryString);
    const entries = urlParams.entries();
    const checked_items = [];
    $(".terp-box:checked").each(function(){
      checked_items.push(this.name);
    });
    var new_search = "";
    for(const entry of entries) {
      if(entry[0] != 'weight') {
        new_search += "&" + entry[0] + "=" + entry[1];
      }
    }
    new_search += "&weight=" + e.target.value;
    location.href = "?1=1" + new_search;
   // filterListings()
  }

  function toggleTiers(e) {
    e.preventDefault();
    const queryString = window.location.search.replace("?1=1","");
    const urlParams = new URLSearchParams(queryString);
    const entries = urlParams.entries();
    var new_search = "";
    for(const entry of entries) {
      if(entry[0] != 'tier') {
        new_search += "&" + entry[0] + "=" + entry[1];
      }
    }
    new_search += "&tier=" + e.target.id;
    location.href = "?1=1" + new_search;
   // filterListings()
  }

  function initSliders() {
    // thc slider UI
    thcSlider = document.getElementById('thc-slider')
    if (thcSlider) {
      const valueType = $('#thc-slider').data('type') || '%'
      const maxRange = $('#thc-slider').data('range') || 100
      noUiSlider.create(thcSlider, {
        start: [0, maxRange],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
          min: 0,
          max: maxRange,
        },
        format: wNumb({
          decimals: 0,
        }),
      })

      // update range values when sliding
      let thcRangeValues = document.getElementById('thc-range-values')

      thcSlider.noUiSlider.on('update', function (values) {
        thcRangeValues.innerHTML = Math.floor(values[0]) + valueType + ' - ' + Math.floor(values[1]) + valueType
      })

      thcSlider.noUiSlider.on('change', function (values) {
        filterListings()
      })
    }

    // cbd slider UI
    cbdSlider = document.getElementById('cbd-slider')
    if (cbdSlider) {
      const valueType = $('#thc-slider').data('type') || '%'
      const maxRange = $('#thc-slider').data('range') || 100
      noUiSlider.create(cbdSlider, {
        start: [0, maxRange],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
          min: 0,
          max: maxRange,
        },
        format: wNumb({
          decimals: 0,
        }),
      })

      // update range values when sliding
      let cbdRangeValues = document.getElementById('cbd-range-values')

      cbdSlider.noUiSlider.on('update', function (values) {
        cbdRangeValues.innerHTML = Math.floor(values[0]) + valueType + ' - ' + Math.floor(values[1]) + valueType
      })

      cbdSlider.noUiSlider.on('change', function (values) {
        filterListings()
      })
    }
  }
  function initMobileSliders() {
    // thc slider UI
    mobileThcSlider = document.getElementById('thc-slider-mobile')
    if (mobileThcSlider) {
      const valueType = $('#thc-slider').data('type') || '%'
      const maxRange = $('#thc-slider').data('range') || 100
      noUiSlider.create(mobileThcSlider, {
        start: [0, maxRange],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
          min: 0,
          max: maxRange,
        },
        format: wNumb({
          decimals: 0,
        }),
      })

      // update range values when sliding
      let thcRangeValues = document.getElementById('thc-range-values-mobile')

      mobileThcSlider.noUiSlider.on('update', function (values) {
        thcRangeValues.innerHTML = Math.floor(values[0]) + valueType + ' - ' + Math.floor(values[1]) + valueType
      })
    }

    // cbd slider UI
    mobileCbdSlider = document.getElementById('cbd-slider-mobile')
    if (mobileCbdSlider) {
      const valueType = $('#thc-slider').data('type') || '%'
      const maxRange = $('#thc-slider').data('range') || 100
      noUiSlider.create(mobileCbdSlider, {
        start: [0, maxRange],
        connect: true,
        step: 1,
        orientation: 'horizontal', // 'horizontal' or 'vertical'
        range: {
          min: 0,
          max: maxRange,
        },
        format: wNumb({
          decimals: 0,
        }),
      })

      // update range values when sliding
      let cbdRangeValues = document.getElementById('cbd-range-values-mobile')

      mobileCbdSlider.noUiSlider.on('update', function (values) {
        cbdRangeValues.innerHTML = Math.floor(values[0]) + valueType + ' - ' + Math.floor(values[1]) + valueType
      })
    }
  }
  /**
   * Filtering Logic
   */

  function filterListings(type = "desktop") {
    resetList()

    // filter by weight first
    const weightToFilter = $('[name="weight"]:checked').val() || ''
    const filteredByWeight = filterByWeight(weightToFilter)

    // filter by thc range next
    const [tchFrom, thcTo] = type == "desktop" ? thcSlider.noUiSlider.get() : mobileThcSlider.noUiSlider.get()
    const filteredByTCH = filterByTCHRange(parseInt(tchFrom), parseInt(thcTo), filteredByWeight)

    // then filter by cbd range
    const [cbdFrom, cbdTo] = type == "desktop" ? cbdSlider.noUiSlider.get() : mobileCbdSlider.noUiSlider.get()
    const filteredByCBD = filterByCBDRange(parseInt(cbdFrom), parseInt(cbdTo), filteredByTCH)

    renderUpdatedList(filteredByCBD)
  }

  function filterByWeight(weightLimit) {
    let filtered = listData.filter((i, e) => {
      let productWeights = $(e).find('.product-weight').text()
      return productWeights.indexOf(weightLimit) > -1 ? true : false
    })

    return filtered
  }

  function filterByTCHRange(min, max, arrayToFilter) {
    const array = arrayToFilter || listData
    let filtered = array.filter((i, e) => {
      const isActive = !$(e).hasClass('hide')
      const units = parseInt($(e).find('.thc-value').text())

      if (isNaN(units)) {
        return true
      }

      return units >= min && units <= max
    })

    return filtered
  }

  function filterByCBDRange(min, max, arrayToFilter) {
    const array = arrayToFilter || listData
    let filtered = array.filter((i, e) => {
      const isActive = !$(e).hasClass('hide')
      const units = parseInt($(e).find('.cbd-value').text())

      if (isNaN(units)) {
        return true
      }

      return units && units >= min && units <= max
    })

    return filtered
  }

  function renderUpdatedList(filteredData) {
    hideNoProducts()
    resetList()

    if (filteredData && filteredData.length > 0) {
      filteredData.each(function () {
        $(this).addClass('active')
      })
    }

    if (filteredData.length === 0) {
      showNoProducts()
    }

    listData.each(function () {
      const isActive = $(this).hasClass('active')
      if (!isActive) {
        $(this).addClass('hide')
      }
    })
  }

  function resetList() {
    listData.each(function () {
      $(this).removeClass('hide active')
    })
  }

  function showNoProducts() {
    $('.no-products-container').removeClass('hide')
  }

  function hideNoProducts() {
    $('.no-products-container').addClass('hide')
  }
})($)
