window.API = (function(){
  var apiKey = "978296a9ef4078e2e295d80d463bec00";
  var movieApi = "https://api.themoviedb.org/3/";

  var searchFn = function(query, page, callback) {
    $.get(movieApi + 'search/movie?query=' + query + '&api_key=' + apiKey + "&page=" + page, callback);
  }

  var recentFn = function(page, callback){
    $.get(movieApi + 'movie/now_playing?api_key=' + apiKey + "&page=" + page, callback);
  }

  var detailsFn = function(id, callback){
    $.get(movieApi + 'movie/' + id + '?api_key=' + apiKey, callback);
  }

  return {
    search  : searchFn,
    recent  : recentFn,
    details : detailsFn
  }

})();