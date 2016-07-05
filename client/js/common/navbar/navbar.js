module.exports = "app.common.navbar";

import template from './navbar.html';

let navbarModule = angular.module(module.exports, [])

navbarModule.directive('navbar', function($state, Auth) {
	return {
        restrict: 'E',
        replace: true,
        template: template,
        link: function(scope, elem, attrs) {
            scope.isAdmin = Auth.isAdmin;

            scope.logout = () => {
                Auth.logout();
                $state.go('login');
            }
    	}
	};
});

export default navbarModule;

