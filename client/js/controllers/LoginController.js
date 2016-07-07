module.exports = 'app.controllers.LoginController';

var app = angular.module(module.exports, []);

app.controller('LoginController', function($scope, $state, translationService, Auth) {
  	console.log("LoginController");
  	$scope.user = {};
    $scope.errors = {};
    $scope.is_loading = false;

  	$scope.login = function(user) {
  		$scope.is_loading = true;
  		Auth.login(user, function(err) {
  			console.log("ERROR:",err);
  		})
        .then(function() {
          // Logged in, redirect to home
          $scope.is_loading = false;
          $state.go('main.routes');
        })
        .catch(function(err) {
        	$scope.is_loading = false;
          $scope.errors.other = err.message;
        });
  	}
});
