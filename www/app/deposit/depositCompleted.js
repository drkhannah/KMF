(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositCompletedController', DepositCompletedController);

    stateProvider.$inject = ['$stateProvider'];
    DepositCompletedController.$inject = ['depositService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-completed', {
                url: '/deposit/deposit-completed',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositCompleted.html',
                        controller: 'DepositCompletedController as vm'
                    }
                }
            })
    }

    /* @ngInject */
    function DepositCompletedController(depositService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;


        vm.activate = activate;
        vm.anotherDeposit = anotherDeposit;
        vm.title = 'Deposit Completed';


        activate();

        ////////////////

        function activate() {

        }

        //changes state to app.deposit, clears data out of depositService
        function anotherDeposit() {

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicHistory.clearCache();
            $state.go('app.deposit');
            depositService.checkObj = {
                checkAmount: null,
                checkFrontImage: null,
                checkBackImage: null
            };
            depositService.depositObj = {
                account: null,
                checksTotalAmount: null,
                depositAmount : null,
                checks: [],
                status: null,
                type: null,
                mode: null
            };

            console.log ('depositService Object: ' + angular.toJson(depositService));
        }

    }

})();