(function () {
    'use strict';

    angular
        .module('app.signin')
        .config(stateProvider)
        .controller('SigninController', SigninController);

    stateProvider.$inject = ['$stateProvider'];
    SigninController.$inject = ['signinService', '$state', '$ionicHistory', 'errorToastService'];

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
    function SigninController(signinService, $state, $ionicHistory, errorToastService) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.signin = signin;
        vm.usernameChange = usernameChange;
        vm.passwordChange = passwordChange;
        vm.title = 'Signin';
        vm.appName = 'KTT Mobile Deposit';
        vm.username = signinService.username;
        vm.password = signinService.password;
        vm.signinForm;

        activate();

        ////////////////

        function activate() {

        }

        function signin($error){
            if(Object.keys($error).length >= 1){
                errorToastService.errorToast($error);
            } else if(signinService.username === 'admin' && signinService.password === 'admin') {
                signinService.signin().then(function () {
                    signinService.namePass = true;
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicHistory.clearCache();
                    $state.go('securityQuestions');
                })
            } else {
                errorToastService.errorToast('Username or Password Incorrect');
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