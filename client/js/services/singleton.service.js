module.exports = 'app.services.singleton';
var app = angular.module(module.exports, []);

app.factory('singletonService', function(User) {
	var _users = [];
	var _current_coords = {}; //longitude, latitude

	return {
		getUsers : function() {
			console.log("getUsers", _users)
			if(_users.length == 0) {
				return User.query((users) => {
					console.log("test:", users)
					_users = users;
					return _users;
				});
			} else {
				return _users;
			}
		},
		setUsers : function(users) {
			_users = users;
		},
		getUserById : function(user_id) {
			return User.get({'id':user_id}, (user) => {
				console.log("user:",user )
			});
			// console.log("Find user in this list:", _users)
			// return _users.find((user) => {return user._id === user_id});
		},
		setCurrentPosition : function(coords) {
			_current_coords = coords;
		},
		getCurrentPosition : function() {
			return _current_coords;
		}
	}
});
