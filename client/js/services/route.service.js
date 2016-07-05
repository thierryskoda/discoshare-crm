// This service will be used to translate all the text in the app.

module.exports = 'app.services.route';
var app = angular.module(module.exports, []);

app.factory('routeService', function($http, envService) {
	var _routes = [];

	return {
		fetchRoutes : function() {
			if(_routes.length == 0) {
				if(envService.is('development')) {
					return [
					  { name: 'Dominion Square Tavern',
						arrival: 0,
						distance: 0,
						lng: -73.57145,
						lat: 45.5006,
						address: '1243 Rue Metcalfe' },
					  { name: 'N Sur Mackay',
						arrival: 2,
						distance: 1.4,
						lng: -73.5762235,
						lat: 45.4953075,
						address: '1244 Rue Mackay' },
					  { name: 'Grumpy\'s Bar',
						arrival: 2,
						distance: 1.5,
						lng: -73.57585,
						lat: 45.49601,
						address: '1242 Rue Bishop' },
					  { name: 'Bar Cloakroom',
						arrival: 3,
						distance: 2.1,
						lng: -73.57777,
						lat: 45.49951,
						address: '2175 Rue de la Montagne' },
					  { name: 'Pullman',
						arrival: 4,
						distance: 3.3,
						lng: -73.5721,
						lat: 45.50845,
						address: '3424 Avenue du Parc' },
					  { name: 'Nyks Bistro Pub',
						arrival: 5,
						distance: 4,
						lng: -73.56667,
						lat: 45.50601,
						address: '1250, rue de Bleury' },
					  { name: 'Notkins',
						arrival: 6,
						distance: 4.3,
						lng: -73.5637947,
						lat: 45.504985,
						address: '1101 Rue Bleury' },
					  { name: 'Mimi La Nuit',
						arrival: 7,
						distance: 5.5,
						lng: -73.5534445159386,
						lat: 45.5059189542855,
						address: '22 Rue Saint-Paul E' },
					  { name: 'Le Mal Nécessaire',
						arrival: 8,
						distance: 6.3,
						lng: -73.5612698,
						lat: 45.5085754,
						address: '1106B Saint Laurent Boulevard' },
					  { name: 'Le Sainte-Elisabeth',
						arrival: 9,
						distance: 6.9,
						lng: -73.5621467,
						lat: 45.5121952,
						address: '1412 Rue Sainte-Elisabeth' }
					]
				}

				return $http.get(envService.read('endpoint') + '/api/leads?term=bars&location=montreal')
					.success(function(result) {
						_routes = result;
						return result;
					})
					.error(function(error) {
						console.log("ERROR:",error);
						return error;
					})
			} else {
				return _routes;
			}

		}

	}
});
