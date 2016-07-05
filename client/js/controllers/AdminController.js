module.exports = 'app.controllers.AdminController';

var app = angular.module(module.exports, []);

app.controller('AdminController', function($scope, $state, translationService, User, $uibModal, $http, config, envService, modalService, toastr, users, singletonService) {
    console.log("AdminController:");
    console.log("The fetched users:", users);
    singletonService.setUsers(users);
    $scope.user = {} //(envService.get() === "development") ? {name:"Name",email:"email@email.com",location:"Montreal",term:"bars",password:"12345",role:"sale"} : {};
    $scope.users = users;
    $scope.terms = ["bars","restaurants","club","hotels"];
    $scope.errors = {};

    $scope.goTo = (state, params) => {
        $state.go(state, params);
    }

    $scope.delete_user = (user) => {
        console.log("test:", user.email)
        if(user.email === "admin@admin.com" || user.name === "Admin") return toastr.error("Don't delete me", "I'm the Admin");

        let index = $scope.users.indexOf(user);
        if(index > -1) {
            modalService.confirm(`Are you sure you want to delete ${user.name}`, "This can't be reversed", (response) => {
                if(response) {
                      $http.delete(envService.read('endpoint')+ '/api/users/' + user._id)
                        .success(function(result) {
                            toastr.success("Success", user.name + " was correctly deleted");
                            $scope.users.splice(index,1);
                        })
                        .error(function(error) {
                            console.log("ERROR:",error);
                        });
                }
            });
        }
    };

    $scope.edit_user = () => {
        $state.go('main')
    }
})

app.controller('EditUserController', function (user, User, $scope, toastr) {
    console.log("User to edit:", user);
    $scope.user = user;

    $scope.generate_random = () => {
        $scope.user = new User({name:"Name",email:"email@email.com",location:"Montreal",term:"bars",password:"12345",role:"sale"});
    };

    $scope.submit_user_form = (form) => {
        console.log("Submitting this user: ", $scope.user);
        $scope.user.$save((user) => {
            toastr.success("Success", user.name + " was correctly created");
            $scope.user = user;
        }, (error) => {
            console.log("ERROR:", error)
            error = (error.data) ? error.data : null;
            if(error && error.errors) {
                $scope.errors.email = (error.errors.email) ? error.errors.email.message : "";
                $scope.errors.password = (error.errors.password) ? error.errors.password.message : "";
                $scope.errors.name = (error.errors.name) ? error.errors.name.message : "";
                $scope.errors.location = (error.errors.location) ? error.errors.location.message : "";
            }
        });
    };
})

app.controller('NewUserController', function (user, User, $scope, toastr) {
    console.log("User to create:", user);
    $scope.user = user;

    $scope.submit_user_form = (form) => {
        console.log("Submitting this user: ", $scope.user);
        $scope.user.$save((user) => {
            toastr.success("Success", user.name + " was correctly created");
            $scope.$parent.users.push(user);
            $scope.user = new User();
        }, (error) => {
            console.log("ERROR:", error)
            error = (error.data) ? error.data : null;
            if(error && error.errors) {
                $scope.errors.email = (error.errors.email) ? error.errors.email.message : "";
                $scope.errors.password = (error.errors.password) ? error.errors.password.message : "";
                $scope.errors.name = (error.errors.name) ? error.errors.name.message : "";
                $scope.errors.location = (error.errors.location) ? error.errors.location.message : "";
            }
        });
    };
})
