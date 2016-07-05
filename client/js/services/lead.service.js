'use strict';

module.exports = 'app.services.lead';
var app = angular.module(module.exports, []);

app.factory('Lead', function ($resource, envService) {
    return $resource(envService.read('endpoint') + '/api/leads/:id', {
        id: '@_id'
    });
});
