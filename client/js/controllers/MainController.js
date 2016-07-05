module.exports = 'app.controllers.MainController';

var app = angular.module(module.exports, []);

app.controller('MainController', function($scope, $state, translationService, currentUser) {
    console.log("MainController");
    console.log("currentUser:", currentUser)
});
