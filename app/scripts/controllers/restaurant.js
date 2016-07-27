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
    $scope.loaded = false;
    $scope.rating = 1;
    $scope.review = '';
    $scope.name = '';
    $scope.isReadonly = true;
    $scope.date = new Date();

    myService.asyncRestaurant($routeParams.id).then(function(response){
      $scope.restaurant = response.data.response;
      $scope.loaded = true;
      console.log($scope.restaurant);
    });

    $scope.addComment = function(){
      $scope.comment = {
        user:{
            firstName:$scope.name
          },
        text:$scope.review,
        createdAt: $scope.date/1000,
        rating: $scope.rating
      };
      $scope.restaurant.venue.tips.groups[0].items.unshift($scope.comment);
      $scope.rating = 1;
    };

  });
