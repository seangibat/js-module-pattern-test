window.Movies = (function(){
  var myMoviesList = [], currentList, sortDirection=1, lastQuery={};

  var sortFn = function(type){
    sortDirection *= -1;
    return currentList.sort(function (a,b){
      a = a[type];
      b = b[type];
      if (a > b)
        return 1 * sortDirection;
      if (b > a)
        return -1 * sortDirection;
      return 0; 
    });
  }

  var moviesFn = function(id){
    if (id != undefined)
      myMoviesList.push(currentList[id]);
    else{
      currentFn(myMoviesList);
      return myMoviesList;
    }
  }

  var currentFn = function(arr){
    if (arr != undefined)
      currentList = arr;
    else {
      lastQuery = {
        type: "mine", 
        query: "",
        page: 1,
        totalPages: 1
      };
      return currentList;
    }
  }

  var searchFn = function (query, callback){
    API.search(query,1,function(d){
      lastQuery = {
        type: "search", 
        query: query,
        page: d.page,
        totalPages: d.total_pages
      };
      currentFn(d.results);
      callback(d.results);
    });
  }

  var detailsFn = function(id, callback){
    API.details(id,function(d){
      callback(d);
    });
  }

  var recentFn = function(callback){
    API.recent(1,function(d){
      lastQuery = {
        type: "recent",
        query: "",
        page: d.page,
        totalPages: d.total_pages
      };
      currentFn(d.results);
      callback(d.results);
    });
  }

  var nextPageFn = function(callback){
    lastQuery.page += 1;
    if (lastQuery.page <= lastQuery.totalPages)
      if (lastQuery.type === "search") {
        API.search(lastQuery.query,lastQuery.page,function(d){
          currentFn(currentList.concat(d.results));
          callback(currentList);
        });
      }
      else if (lastQuery.type === "recent") {
        API.recent(lastQuery.page,function(d){
          currentFn(currentList.concat(d.results));
          callback(currentList);
        });
      }
      else if (lastQuery.type === "mine")
        return myMoviesList;
  }

  return {
    sorted   : sortFn,
    myMovies : moviesFn,
    recent   : recentFn,
    search   : searchFn,
    details  : detailsFn,
    nextPage : nextPageFn
  }

})();