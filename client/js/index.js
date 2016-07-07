import angular from 'angular';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngAnimate from 'angular-animate';
import angEnv from 'angular-environment';
import ngTable from 'ng-table';
import ngGrid from 'angular-ui-grid';
import angularGoogleMap from 'angular-google-maps';
import ngmap from 'ngmap';
import 'angular-modal-service';
import toastr from 'angular-toastr';

// import modalService from 'angular-modal-service';

import common from './common/common';
import routes from './routes';
import services from './services';

import 'angular-ui-bootstrap';
import modalcss from 'angular-ui-bootstrap/src/modal/index-nocss.js';
// import modal from 'angular-ui-bootstrap/src/modal';

var app = angular.module('app', [
	ngCookies,
	ngAnimate,
	// modalcss,
	// modal,
	'ui.bootstrap',
	'angularModalService',
	ngmap,
	toastr,
	angEnv,
	common,
	routes,
	ngResource,
	services
])

app.config(function(envServiceProvider) {
	// set the domains and variables for each environment
	envServiceProvider.config({
		domains: {
			development: ['localhost'],
			production: ['discoshare-crm.herokuapp.com']
		},
		vars: {
			development: {
				endpoint: 'http://localhost:9000'
			},
			production: {
				endpoint: 'https://discoshare-checkout.herokuapp.com'
			}
		}
	});

	// run the environment check, so the comprobation is made
	// before controllers and services are built
	envServiceProvider.check();
})

app.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
	return {
	  // Add authorization token to headers
	  request: function (config) {
		config.headers = config.headers || {};
		if (config.url && $cookieStore.get('token')) {
		  config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
		}
		return config;
	  },

	  // Intercept 401s and redirect you to login
	  responseError: function(response) {
		if(response.status === 401) {
		  $location.path('/login');
		  // remove any stale tokens
		  $cookieStore.remove('token');
		  return $q.reject(response);
		}
		else {
		  return $q.reject(response);
		}
	  }
	};
})


app.constant('config', {
	'endpoint' : "https://discoshare-checkout.herokuapp.com",
	'statuses' : [{
		slug: "sold",
		title: "Sold"
	},{
		slug: "expensive",
		title: "To expensive"
	},{
		slug: "empty",
		title: "Wasn't there"
	},{
		slug: "busy",
		title: "Busy"
	}]
})


app.run(function ($rootScope, $location, $state, Auth, envService, singletonService) {
	console.log("test:", envService.read('endpoint'));
	if (navigator.geolocation) {
 		 window.onload = function() {
  			var startPos;
  			var geoSuccess = function(position) {
    			startPos = position;
    			console.log("test:", startPos.coords)
    			singletonService.setCurrentPosition(startPos.coords)
  			};
  			navigator.geolocation.getCurrentPosition(geoSuccess);
		};
	}
	else {
  		console.log('Geolocation is not supported for this Browser/OS version yet.');
	}


	if(envService.is('development')) {
		$rootScope.currentUser = Auth.getCurrentUser();
		$rootScope.debug = false;
	}

	// Redirect to login if route requires auth and you're not logged in
	$rootScope.$on('$stateChangeStart', function (event, next) {
		Auth.isLoggedInAsync(function(loggedIn) {
			if (next.authenticate && !loggedIn) {
				console.log("Not logged");
				event.preventDefault();
				$location.path('/login');
				$state.go('login');
			}

			if(next.admin && !Auth.isAdmin()) {
				console.log("Can't go there");
				event.preventDefault();
				$state.go('login');
			}
		});
	});
});
