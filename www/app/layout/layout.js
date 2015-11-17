(function () {
    'use strict';

    angular
        .module('app.layout')
        .config(stateProvider)
        .controller('LayoutController', LayoutController);

    stateProvider.$inject = ['$stateProvider', '$urlRouterProvider'];
    LayoutController.$inject = ['signinService', '$state', 'errorToastService'];

    /* @ngInject */
    function stateProvider($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: '/app',
                templateUrl: 'app/layout/layout.html',
                controller: 'LayoutController as vm'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app');
    }

    /* @ngInject */
    function LayoutController(signinService, $state, errorToastService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.signout = signout;
        vm.checkAccess = checkAccess;
        vm.appTitle = 'KTT Mobile Deposit';
        vm.depositLink = 'Make Deposit';
        vm.historyLink = 'Deposit History';
        vm.reviewLink = 'Deposit Review';
        vm.signoutLink = 'Signout';
        vm.userSignedIn = 'Derek';
        vm.errorToast = errorToastService.errorToastMessage;

        activate();

        ////////////////

        function activate() {
            checkAccess();
            console.log('after checkAccess(): ' + angular.toJson(signinService));
        }

        function checkAccess() {
            if(!signinService.access){
                $state.go('signin');
            } else {
                $state.go('app.deposit')
            }
        }

        function signout() {
            signinService.logout().then(function () {
                console.log('after signout(): ' + angular.toJson(signinService));
                $state.go('signin');
            });
        }
    }
})();