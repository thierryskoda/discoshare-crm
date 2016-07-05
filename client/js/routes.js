require('angular-ui-router');

module.exports = 'app.routes';
var app = angular.module(module.exports, [
  'ui.router',
  require('./controllers/MainController'),
  require('./controllers/RoutesController'),
  require('./controllers/LoginController'),
  require('./controllers/AdminController')
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  const ROOT_URL = '';

  $stateProvider
    .state('login', {
      url: ROOT_URL + '/login',
      template: require('../templates/login.html'),
      controller: 'LoginController'
    })
    .state('main', {
      abstract: true,
      url: ROOT_URL + '',
      template: require('../templates/main.html'),
      controller: 'MainController'  ,
      authenticate : true,
      resolve : {
        currentUser : function(Auth) {
            return Auth.getCurrentUser();
        }
      }
    })
    .state('main.routes', {
      url: ROOT_URL + '/routes',
      template: require('../templates/routes.html'),
      controller: 'RoutesController',
      authenticate : true,
      resolve : {
        routes : function(routeService) {
            return routeService.fetchRoutes();
        }
      }
  	})
    .state('main.admin', {
      abstract : true,
      url: ROOT_URL + '/admin',
      template: require('../templates/admin.html'),
      controller: 'AdminController',
      authenticate : true,
      admin : true,
      resolve: {
        users: function(singletonService, User) {
            return User.query().$promise
        }
      }
    })
    .state('main.admin.new', {
      url: ROOT_URL + '/users/new',
      template: require('../templates/admin.users.edit.html'),
      controller: 'NewUserController',
      authenticate : true,
      resolve : {
        user : function(User) {
            return new User();
        }
      }
    })
    .state('main.admin.edit', {
      url: ROOT_URL + '/users/{user_id}',
      template: require('../templates/admin.users.edit.html'),
      controller: 'EditUserController',
      authenticate : true,
      resolve : {
        user : function(singletonService, $stateParams, User) {
            return User.get({'id':$stateParams.user_id}).$promise
            .then((user) => {
                return user;
            })
            .catch(() => {
                return new User();
            })
        }
      }
    })
    .state('main.admin.users', {
      url: ROOT_URL + '/users',
      template: require('../templates/admin.users.html'),
      authenticate : true
    })


  // $httpProvider.defaults.useXDomain = true
  // delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.interceptors.push('authInterceptor');
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/routes');
})


