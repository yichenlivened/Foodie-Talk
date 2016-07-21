'use strict';

/**
 * @ngdoc function
 * @name foodieTalkApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the foodieTalkApp
 */
angular.module('foodieTalkApp')
  .controller('MainCtrl', function ($scope, myService) {

    $scope.loaded = false;
    navigator.geolocation.getCurrentPosition(function(position){
        $scope.$apply(function(){
          $scope.position = position;
          var section = 'food';
          var ll = $scope.position.coords.latitude + ',' +$scope.position.coords.longitude;
          myService.asyncRestaurantList(ll, section).then(function(response){
            $scope.data = response.data.response;
            $scope.loaded = true;
            console.log($scope.data);
            $scope.restaurants = $scope.data.groups[0].items;
          });
        });
    });

    

  });
