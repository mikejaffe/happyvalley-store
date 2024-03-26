document.addEventListener("DOMContentLoaded", function(){
    if(document.querySelector('.image-thumbs')) {

    document.querySelector('.image-thumbs').addEventListener('click', function(e){
      var image = e.target.dataset.image;
      document.querySelector('.product-image').src = image;
      $(".zoom").attr('data-magnify-src',image);
      $('.zoom').magnify();
    });
    }
  });

$(document).ready(function() {
  $('.zoom').magnify();
    $('.back-link').on('click', function(e){
      e.preventDefault();
      history.back();
    });
    $(".terp-box").on('click',function(e){
      const queryString = window.location.search.replace("?1=1","");
      const urlParams = new URLSearchParams(queryString);
      const entries = urlParams.entries();
      const checked_items = [];
      $(".terp-box:checked").each(function(){
        checked_items.push(this.id);
      });
      var new_search = "";
      for(const entry of entries) {
        if(entry[0] != 'terpenes') {
          new_search += "&" + entry[0] + "=" + entry[1];
        }
      }
      for(const i of checked_items) {
        new_search += "&terpenes=" + i;
      }
      location.href = "?1=1" + new_search;
    });
});
