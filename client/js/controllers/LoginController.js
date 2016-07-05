module.exports = 'app.controllers.LoginController';

var app = angular.module(module.exports, []);

app.controller('LoginController', function($scope, $state, translationService, Auth) {
  	console.log("LoginController");
  	$scope.user = {};
    $scope.errors = {};

  	$scope.login = function(user) {
  		Auth.login(user, function(err) {
  			console.log("ERROR:",err);
  		})
        .then(function() {
          // Logged in, redirect to home
          $state.go('main.routes');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
  	}
});
