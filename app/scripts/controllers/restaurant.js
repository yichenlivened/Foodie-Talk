'use strict';

/**
 * @ngdoc function
 * @name foodieTalkApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the foodieTalkApp
 */
angular.module('foodieTalkApp')
  .controller('RestaurantCtrl', function ($routeParams, $scope, myService) {
    console.log($routeParams);
    myService.asyncRestaurant($routeParams.id).then(function(response){
      $scope.restaurant = response.data.response;
      console.log($scope.restaurant);
    });
  });
