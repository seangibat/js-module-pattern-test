$(document).ready(function(){

  window.Display = (function(){
    var movies_list_template = Handlebars.compile($('#movies-list').html());
    var movie_details_template = Handlebars.compile($('#movie-details').html());
    var $listBody = $('.listBody');
    var $sidebar = $('.sidebar');
    var $titleH1 = $('#listTitle');

    var detailsFn = function(d){
      $sidebar.html(movie_details_template(d));
    }

    var listFn =  function(d){
      $listBody.html(movies_list_template(d));
    }

    var titleFn = function(title){
      $titleH1.text(title);
    }

    return {
      details : detailsFn,
      list    : listFn,
      title   : titleFn
    }

  })();

});