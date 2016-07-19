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
    async: function(ll,section){
      var data = {
        client_id: auth.clienId,
        client_secret: auth.clientSecret,
        ll:ll,
        section: section,
        venuePhotos:1,
        v: getToday()
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
    }
  };

  return myService;
});
