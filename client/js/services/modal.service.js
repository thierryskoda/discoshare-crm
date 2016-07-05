import modalConfirmTemplate from '../../templates/modal.confirm.html';


module.exports = 'app.services.modal';
var app = angular.module(module.exports, []);


app.controller('ModalConfirmController', ($scope, $uibModalInstance, title, body) => {
    console.log("Modal confirm controller");
    $scope.title = title;
    $scope.body = body;

    $scope.ok = function () {
        $uibModalInstance.close(true);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss(false);
    };
});


app.factory('modalService', function($uibModal) {
    return {
        confirm : function(title, body, cb) {
            var modalInstance = $uibModal.open({
                animation: true,
                template: modalConfirmTemplate,
                controller: 'ModalConfirmController',
                size : "big",
                resolve : {
                    title : () => {
                        return title;
                    },
                    body : () => {
                        return body;
                    }
                }
            });

            modalInstance.result.then( (response) => {
                cb(response);
            });
        }
    }
});
