(function () {
    'use strict';

    angular
        .module('app.signin')
        .config(stateProvider)
        .controller('TermsController', TermsController);

    stateProvider.$inject = ['$stateProvider'];
    TermsController.$inject = ['signinService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider) {
        $stateProvider
            .state('terms', {
                cache: false,
                url: '/terms',
                templateUrl: 'app/signin/terms.html',
                controller: 'TermsController as vm'
            });
    }

    /* @ngInject */
    function TermsController(signinService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.acceptTerms = acceptTerms;
        vm.dontAccept = dontAccept;
        vm.title = 'Terms';
        vm.termsAccepted = signinService.termsAccepted;

        activate();

        ////////////////

        function activate() {
        }

        function acceptTerms(){
            signinService.submitTerms().then(function () {
                signinService.termsAccepted = true;
                signinService.access = true;
                signinService.role = 'DEPOSITOR';
                $ionicHistory.nextViewOptions({
                    disableBack: true
                });
                $ionicHistory.clearCache();
                $state.go('app');
                console.log('after accepTerms(): ' + angular.toJson(signinService))
            })
        }

        function dontAccept(){
            signinService.logout().then(function () {
                console.log('after dontAccept(): ' + angular.toJson(signinService));
                $state.go('signin');
            });
        }
    }
})();