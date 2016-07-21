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
        limit: 30
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
  .filter('price', filterPrice)
  .filter('comment', filterComment)
  .directive('starRating', starRating);

function filterPrice(){
  return function(tier, currency) {
    var i, price = '';
    for(i=0; i<parseInt(tier); i++){
      price = price.concat(currency);
    }
    return price;
  }

}
function filterComment(){
  return function(text) {
    return '"'+text+'"';
  }
}

function starRating(){
  return {
    restrict:'AE',
    template:
    '<ul class="star-rating" tabindex="{{readonly ? 0 : -1}}" aria-label="{{ratingValue}} star" ng-class="{readonly: readonly}">' +
    '  <li ng-repeat="star in stars" class="star" ng-class="{filled: star.filled}" ng-click="toggle($index)" tabindex="{{readonly ? -1 : 0}}">' +
    '    <i class="fa fa-star" aria-label="{{$index+1}} star"></i>' + // or &#973
    '  </li>' +
    '</ul>',
    scope: {
      ratingValue: '=?ngModel',
      max: '=?', // optional (default is 5)
      onRatingSelect: '&?',
      readonly: '=?'
    },
    link: function(scope, element, attributes){
      if (scope.max == undefined) {
        scope.max = 5;
      }
      if (scope.ratingValue == undefined) {
        scope.ratingValue = Math.floor((Math.random() * 5) + 1);
      }
      console.log(scope.ratingValue);
      function updateStars() {
        scope.stars = [];
        for (var i = 0; i < scope.max; i++) {
          if(scope.readonly == undefined || scope.readonly === false){
              scope.stars.push({
                filled: i < Math.floor(scope.ratingValue)
              });
          } else {
            scope.stars.push({
                filled: i < Math.floor(scope.ratingValue)
            });
          }

        }
      };

      scope.toggle = function(index) {
        if (scope.readonly == undefined || scope.readonly === false){
          scope.ratingValue = index + 1;
          scope.onRatingSelect = function(){
              rating: index + 1;
          };
        }
      };
      scope.$watch('ratingValue', function(oldValue, newValue) {
        if (newValue) {
          updateStars();
        }
      });
    }
  }
}
