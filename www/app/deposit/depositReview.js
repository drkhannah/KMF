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
        var vm = this;

        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.depositAmountChange = depositAmountChange;
        vm.addCheck = addCheck;
        vm.completeDeposit = completeDeposit;
        vm.deleteCheck = deleteCheck;
        vm.retake = retake;
        vm.getChecksTotal = getChecksTotal;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.title = 'Deposit Review';
        vm.checkObj = depositService.checkObj;
        vm.depositObj = depositService.depositObj;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.depositObj.account;
        vm.depositAmount = depositService.depositObj.depositAmount;
        vm.checksTotalAmount = depositService.depositObj.checksTotalAmount;
        vm.checks = depositService.depositObj.checks;

        activate();

        ////////////////

        //function runs when controller is activated
        function activate() {
            vm.selectedAccount = vm.depositObj.account;
            vm.checks = vm.depositObj.checks;
            vm.getChecksTotal();
            vm.depositObj.checksTotalAmount = vm.checksTotalAmount;
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
            vm.depositObj.account = vm.selectedAccount;
            console.log(depositService);
        }
        
        // update depositService.account when selection changes in view
        function depositAmountChange() { 
            vm.depositObj.depositAmount = vm.depositAmount;
            console.log(depositService);
        }

        //Delete check from checks list, then retotal checks amount total
        function deleteCheck(index) {
            vm.depositObj.checks.splice(index, 1);
            vm.getChecksTotal();
            vm.depositObj.checksTotalAmount = vm.checksTotalAmount;
            console.log (depositService);
        }

        //retake sends checkId to to capture-check view
        function retake(check, account) {
            $ionicHistory.clearCache();
            $state.go('app.capture-check', {hashKey: check.$$hashKey});
            vm.checkObj.checkAmount = check.checkAmount;
            vm.checkObj.checkFrontImage = check.checkFrontImage;
            vm.checkObj.checkBackImage = check.checkBackImage;
            console.log ('going from depositReview to captureCheck: ' + angular.toJson(depositService));
        }

        //changes state to app.check-capture
        function addCheck() {
            $ionicHistory.clearCache();
            $state.go('app.capture-check');
            vm.depositObj.account = vm.selectedAccount;
            vm.depositObj.depositAmount = vm.depositAmount;
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