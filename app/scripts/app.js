'use strict';

/**
 * @ngdoc overview
 * @name foodieTalkApp
 * @description
 * # foodieTalkApp
 *
 * Main module of the application.
 */
angular
.module('foodieTalkApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/restaurant/:id', {
        templateUrl: 'views/restaurant.html',
        controller: 'RestaurantCtrl',
        controllerAs: 'restaurant'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
})

.factory('myService',function($http){
  var auth = {
    clienId: '222LJGYTFP5HPMFVJLICYJ4UBWTBBQJRHPXI404GZEI3MT5T',
    clientSecret: 'Y1TYEO5ZFREPIRXHVB5O1TSU1OGEH3K0DCWQXSR2NZKR4T1K'
  };

  function getToday(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
      dd='0'+dd;
    }

    if(mm<10) {
      mm='0'+mm;
    }

    today = yyyy+mm+dd;
    return today;
  }

  var myService = {
    asyncRestaurantList: function(ll,section){
      var data = {
        client_id: auth.clienId,
        client_secret: auth.clientSecret,
        ll:ll,
        section: section,
        venuePhotos:1,
        v: getToday(),
        limit: 10
      };

      var promise = $http({
        method: 'GET',
        url: 'https://api.foursquare.com/v2/venues/explore',
        params: data
      }).success(function (response) {
        return response.data;
      }).error(function (error) {
        console.log(error);
      });

      return promise;
    },

    asyncRestaurant: function(id){
      var data = {
        client_id: auth.clienId,
        client_secret: auth.clientSecret,
        v: getToday()
      };

      var promise = $http({
        method: 'GET',
        url: 'https://api.foursquare.com/v2/venues/'+id,
        params: data
      }).success(function (response) {
        return response.data;
      }).error(function (error) {
        console.log(error);
      });

      return promise;
    }
  };

  return myService;
})

.filter('price', function() {
  // Create the return function and set the required parameter as well as an optional paramater
  return function(tier, currency) {
    var i, price = '';
    for(i=0; i<parseInt(tier); i++){
      price = price.concat(currency);
    }
    return price;
  }

})

.filter('comment', function() {
    return function(text) {
      return '"'+text+'"';
    }
  })
;
