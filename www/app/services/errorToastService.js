angular
    .module('app.core')
    .factory('errorToastService', errorToastService);

errorToastService.$inject = ['ionicToast'];

/* @ngInject */
function errorToastService(ionicToast) {
    var service = {
        errorToast: errorToast,
        errorToastMessage: null
    };

    return service;

    ////////////////

    function errorToast($error){
        service.errorToastMessage = null;

        if(Object.keys($error).length >= 1){
            var error = Object.keys($error)[0];
            var errorObj = $error[error][0];
            var fieldName = errorObj.$name;

            if(fieldName && error) {
               service.errorToastMessage = 'The ' + fieldName + ' field is ' + error;
            }
        } else {
            service.errorToastMessage = 'error message sent from server';
        }

        ionicToast.show(service.errorToastMessage, 'top', false, 2500);
    }

}