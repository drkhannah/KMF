angular
    .module('app.core')
    .factory('errorToastService', errorToastService);

errorToastService.$inject = [];

/* @ngInject */
function errorToastService() {
    var service = {
        errorToast: errorToast,
        errorToastMessage: null
    };

    return service;

    ////////////////

    function errorToast(err){
        service.errorToastMessage = null;

        if(typeof err === 'object' && Object.keys(err).length >= 1){
            var error = Object.keys(err)[0];
            var errorObj = err[error][0];
            var fieldName = errorObj.$name;

            if(fieldName && error) {
               service.errorToastMessage = 'The ' + fieldName + ' field is ' + error;
                notie.alert(2, '<i class="icon ion-android-warning"></i>' + service.errorToastMessage, 2);
            }
        } else if(typeof err === 'string'){
            service.errorToastMessage = err;
            notie.alert(2, '<i class="icon ion-android-warning"></i>' + service.errorToastMessage, 2);
        }

    }

}