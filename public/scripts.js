var listItemClickHandler = function(e){
  var id = $(this).data('id');
  Movies.details(id,Display.details);
}

var searchTypeHandler = function(e){
  var query = $(this).val();
  if (query.length > 1){
    Movies.search(query,Display.list);
    Display.title("Search for: " + query);
  }
  else{
    Movies.recent(Display.list);
    Display.title("Recent Movies");
  }
}

var addMovieClickHandler = function(e){
  var indexId = $(this).data('index');
  Movies.myMovies(indexId);
}

var sortableHeaderClickHandler = function(e){
  var sortType = $(this).text();
  sortType = (sortType == "Name") ? "title" : 
    (sortType == "Score") ? "vote_average" : 
    (sortType == "Release Date") ? "release_date" : "";
  var sortedList = Movies.sorted(sortType);
  Display.list(sortedList);
}

var recentMoviesLinkClickHandler = function(){
  Movies.recent(Display.list);
  Display.title("Recent Movies");
}

var myMoviesLinkClickHandler = function(){
  Display.list(Movies.myMovies());
  Display.title("My Movies");
}

$(document).ready(function(){

  $(document).on('click','.listItem',listItemClickHandler);
  $(document).on('keyup','#search',searchTypeHandler);
  $(document).on('click','.addMovie',addMovieClickHandler);
  $(document).on('click','.sortable',sortableHeaderClickHandler);
  $(document).on('click','#recentLink',recentMoviesLinkClickHandler);
  $(document).on('click','#myMoviesLink',myMoviesLinkClickHandler);

  // Initialize the page by displaying the most recent movies and the next page.  
  Movies.recent(function(){
    Movies.nextPage(function(){
      Movies.nextPage(Display.list);
      Display.title("Recent Movies");
    });
  });

  //Endless scroll
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 50) {
      Movies.nextPage(function(d){
        Display.list(d);
      });
    }
  });

});


