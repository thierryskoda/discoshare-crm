import modalTemplate from '../../templates/modal.html';
import modalDetailsTemplate from '../../templates/modal.details.html';

module.exports = 'app.controllers.RoutesController';

var app = angular.module(module.exports, []);


/*
	ModalFullRouteController
*/
app.controller('ModalFullRouteController', ($scope, $timeout, wayPoints, singletonService) => {
	console.log("Full route controller");
	$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLI-qaqPxlWNIkeekT31KZBPdrdkYnub4";
	$scope.render_map = false;

	// Waypoints of the map and the map settings
	let way_points = wayPoints.map((route) => {return { location: { lat: route.lat, lng: route.lng }, stopover: true}});
	$scope.maps_options = {
		center: {
			latitude: wayPoints[0].lat,
			longitude: wayPoints[0].lng
		},
		travelMode : "WALKING",
		destination : wayPoints[way_points.length-1].address,
		wayPoints : way_points.slice(1, way_points.length-1)
	};

	// Do we already have the user current position ?
	if(!singletonService.getCurrentPosition().latitude) {
		// Get the current location of the user and wait for it before rendering the map
		var geoSuccess = function(position) {
			singletonService.setCurrentPosition(position.coords)

			$scope.origin = {
				'lat': position.coords.latitude,
				'lng': position.coords.longitude,
			}

			$timeout(() => {
				$scope.render_map = true;
			},1000);
		};
		navigator.geolocation.getCurrentPosition(geoSuccess);
	} else {
		$scope.origin = {
			'lat': singletonService.getCurrentPosition().latitude,
			'lng': singletonService.getCurrentPosition().longitude,
		};
		$timeout(() => {
			$scope.render_map = true;
		},1000);
	}

});


/*
	ModalRouteDetailController
*/
app.controller('ModalRouteDetailController', ($scope, route, config, $uibModalInstance) => {
	console.log("Modal Route Detail Controller");
	$scope.route = route;
	$scope.statuses = config.statuses;

	$scope.submit_route_detail = (form) => {
		$uibModalInstance.close($scope.lead);
	}

	$scope.cancel = function () {$uibModalInstance.dismiss(false);};
});


/*
	RoutesController
*/
app.controller('RoutesController', function($scope, $state, $http, envService, routes, ModalService, $uibModal, toastr) {
	console.log("RoutesController : ", routes);
	$scope.routes = (Array.isArray(routes)) ? routes : routes.data;
	$scope.is_searching_routes = false;

	// ModalService.showModal({
	//   template: modalTemplate,
	//   controller: 'YesNoController'
	// }).then(function(modal) {
	//   // The modal object has the element built, if this is a bootstrap modal
	//   // you can call 'modal' to show it, if it's a custom modal just show or hide
	//   // it as you need to.
	//   modal.element.modal();
	//   modal.close.then(function(result) {
	//     $scope.message = result ? "You said Yes" : "You said No";
	//   });
	// });

	$scope.show_full_route = () => {
		var modalInstance = $uibModal.open({
			animation: true,
			template: modalTemplate,
			controller: 'ModalFullRouteController',
			size : "big",
			resolve : {
				wayPoints : () => {
					return $scope.routes;
				}
			}
		});

		modalInstance.result.then( () => {});
	}


	$scope.generates_lead = () => {
		$scope.is_searching_routes = true;
		let term = (new Date().getTime() % 2 == 0) ? "bars" : "restaurants";

		$http.get(envService.read('endpoint') + '/api/leads?term=' + term + '&location=montreal')
			.success(function(result) {
				console.log("RESULT:",result);
				$scope.is_searching_routes = false;
				$scope.routes = result;
			})
			.error(function(error) {
				console.log("ERROR:",error);
				$scope.is_searching_routes = false;
			})
	};


	$scope.add_note_to_route = (route) => {
		var modalInstance = $uibModal.open({
			animation: true,
			template: modalDetailsTemplate,
			controller: 'ModalRouteDetailController',
			size : "big",
			resolve : {
				route : () => {
					return route;
				}
			}
		});

		modalInstance.result.then((lead_details) => {
			toastr.success("Success update");
		});
	}
});
