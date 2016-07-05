// This service will be used to translate all the text in the app.

module.exports = 'app.services.translation';
var app = angular.module(module.exports, []);

app.factory('translationService', function() {
	return {
		getText : function(text) {
			return text;
		}
	}
});
