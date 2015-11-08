(function () {
    'use strict';

    angular
        .module('app.signin')
        .config(stateProvider)
        .controller('SigninController', SigninController);

    stateProvider.$inject = ['$stateProvider'];
    SigninController.$inject = ['signinService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider) {
        $stateProvider
            .state('signin', {
                cache: false,
                url: '/signin',
                templateUrl: 'app/signin/signin.html',
                controller: 'SigninController as vm'
            });
    }

    /* @ngInject */
    function SigninController(signinService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.signin = signin;
        vm.usernameChange = usernameChange;
        vm.passwordChange = passwordChange;
        vm.title = 'Signin';
        vm.username = signinService.username;
        vm.password = signinService.password;

        activate();

        ////////////////

        function activate() {

        }

        function signin(){
            if(signinService.username === 'admin' && signinService.password === 'admin') {
                signinService.signin().then(function () {
                    signinService.namePass = true;
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicHistory.clearCache();
                    $state.go('securityQuestions');
                })
            }
        }

        function usernameChange() {
            signinService.username = vm.username;
        }

        function passwordChange() {
            signinService.password = vm.password;
        }
    }
})();