(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('DepositReviewController', DepositReviewController);

    stateProvider.$inject = ['$stateProvider'];
    DepositReviewController.$inject = ['accountsPromise', 'depositService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.deposit-review', {
                cache: false,
                url: '/deposit/deposit-review',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/depositReview.html',
                        controller: 'DepositReviewController as vm',
                        resolve: {
                            accountsPromise: function(depositService){
                                return depositService.loadAccounts();
                            }

                        }
                    }
                }
            })
    }

    /* @ngInject */
    function DepositReviewController(accountsPromise, depositService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this,
            checkObj = depositService.checkObj,
            depositObj = depositService.depositObj;

        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.addCheck = addCheck;
        vm.completeDeposit = completeDeposit;
        vm.deleteCheck = deleteCheck;
        vm.retake = retake;
        vm.getChecksTotal = getChecksTotal;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Deposit Review';
        vm.type = depositService.type;
        vm.mode = depositService.mode;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositObj.account;
        vm.checksTotalAmount = depositObj.checksTotalAmount;
        vm.checks = depositObj.checks;

        activate();

        ////////////////

        //function runs when controller is activated
        function activate() {
            vm.selectedAccount = depositObj.account;
            vm.checks = depositObj.checks;
            vm.getChecksTotal();
            depositObj.checksTotalAmount = vm.checksTotalAmount;
        }

        // calculate the amounts of checks in checks list and total them
        function getChecksTotal(){
            var total = 0;
            vm.checks.forEach(function (check) {
                total += check.checkAmount;
            });
            console.log('checks Total: ' + total);
            vm.checksTotalAmount = total;
        }

        // update depositService.account when selection changes in view
        function accountChange() {
            depositObj.account = vm.selectedAccount;
            console.log(depositService);
        }

        //Delete check from checks list, then retotal checks amount total
        function deleteCheck(index) {
            depositObj.checks.splice(index, 1);
            vm.getChecksTotal();
            depositObj.checksTotalAmount = vm.checksTotalAmount;
            console.log (depositService);
        }

        //retake sends checkId to to capture-check view
        function retake(check, account) {
            $ionicHistory.clearCache();
            $state.go('app.capture-check', {hashKey: check.$$hashKey});
            checkObj.account = account;
            checkObj.checkAmount = check.checkAmount;
            checkObj.checkFrontImage = check.checkFrontImage;
            checkObj.checkBackImage = check.checkBackImage;
            console.log ('going from depositReview to captureCheck: ' + angular.toJson(depositService));
        }

        //changes state to app.check-capture
        function addCheck() {
            $ionicHistory.clearCache();
            $state.go('app.capture-check');
            checkObj.account = depositObj.account;
            console.log(depositService);
        }

        // completes deposit
        function completeDeposit() {
            $ionicHistory.clearCache();
            $state.go('app.deposit-completed');
            console.log (depositService);
        }

    }

})();