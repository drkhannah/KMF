(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositController', DepositController);

        stateProvider.$inject = ['$stateProvider'];
    DepositController.$inject = ['depositService', '$state', '$ionicHistory'];

        /* @ngInject */
        function stateProvider($stateProvider){
            $stateProvider
                .state('app.deposit', {
                    url: '/deposit',
                    views: {
                        'menuContent': {
                            templateUrl: 'app/deposit/deposit.html',
                            controller: 'DepositController as vm'

                        }
                    }
                })
        }

        /* @ngInject */
        function DepositController(depositService, $state, $ionicHistory) {
            /* jshint validthis: true */
            var vm = this;

            vm.activate = activate;
            vm.singleDeposit = singleDeposit;
            vm.multipleDeposit = multipleDeposit;
            vm.cancelDeposit = depositService.cancelDeposit;
            vm.title = 'Make a Deposit';
            vm.userSignedIn = 'Derek';
            vm.depositObj = depositService.depositObj;

            activate();

            ////////////////

            function activate() {

            }


            //initiate Single Check Deposit
            function singleDeposit(){

                vm.depositObj.type = 'SINGLE';
                vm.depositObj.mode = 'CREATE';
                console.log(depositService);
                $ionicHistory.clearCache();
                $state.go('app.capture-check');

            }

            //initiate Multiple Check Deposit
            function multipleDeposit(){

                vm.depositObj.type = 'MULTIPLE';
                vm.depositObj.mode = 'CREATE';
                console.log(depositService);
                $ionicHistory.clearCache();
                $state.go('app.capture-check');

            }
        }

})();