module.exports = "app.common.header";

import template from './header.html';

let headerModule = angular.module(module.exports, [])

headerModule.directive('header', function($state, Auth) {
	return {
        restrict: 'E',
        replace: true,
        template: template,
        link: function(scope, elem, attrs) {
            scope.user = Auth.getCurrentUser();
            scope.is_open = false;

            scope.hamburger_menu_clicked = () => {
                if(scope.is_open) {
                    angular.element(document.querySelector('.nav')).removeClass('nav--open');
                } else {
                    angular.element(document.querySelector('.nav')).addClass('nav--open');
                }
                scope.is_open = !scope.is_open;
            }
	    }
	};
});

export default headerModule;

