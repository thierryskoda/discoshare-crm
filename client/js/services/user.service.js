'use strict';

module.exports = 'app.services.user';
var app = angular.module(module.exports, []);

app.factory('User', function ($resource, envService) {
    return $resource(envService.read('endpoint') + '/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	});
  });
