angular
    .module('app.core')
    .factory('MFPClientPromise', MFPClientPromise);

MFPClientPromise.$inject = ['$q'];

/* @ngInject */
function MFPClientPromise($q){
    /* Setup a Promise to allow code to run in other places anytime after MFP CLient SDK is ready
     Example: MFPClientPromise.then(function(){alert('mfp is ready, go ahead and use WL.* APIs')});
     */
    return window.MFPClientDefer.promise;
}
