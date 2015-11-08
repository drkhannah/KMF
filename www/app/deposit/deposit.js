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
            vm.title = 'Make Deposit';

            activate();

            ////////////////

            function activate() {

            }


            //initiate Single Check Deposit
            function singleDeposit(){

                depositService.type = 'SINGLE';
                depositService.mode = 'CREATE';
                console.log('Deposit Type: ' + depositService.type);
                console.log('Deposit Mode: ' + depositService.mode);
                $ionicHistory.clearCache();
                $state.go('app.capture-check');

            }

            //initiate Multiple Check Deposit
            function multipleDeposit(){

                depositService.type = 'MULTIPLE';
                depositService.mode = 'CREATE';
                console.log('Deposit Type: ' + depositService.type);
                console.log('Deposit Mode: ' + depositService.mode);
                $ionicHistory.clearCache();
                $state.go('app.capture-check');

            }
        }

})();