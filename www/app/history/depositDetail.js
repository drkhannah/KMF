(function () {
    'use strict';

    angular
        .module('app.history')
        .config(stateProvider)
        .controller('HistoryDetailController', HistoryDetailController);

    stateProvider.$inject = ['$stateProvider'];
    HistoryDetailController.$inject = ['historyDetailPromise', '$ionicModal', '$scope', 'depositService', '$state'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.history-detail', {
                url: '/history/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/history/depositDetail.html',
                        controller: 'HistoryDetailController as vm',
                        resolve: {
                            historyDetailPromise: function(historyService, $stateParams){
                                return historyService.historyDetail($stateParams.id)
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function HistoryDetailController(historyDetailPromise, $ionicModal, $scope, depositService, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.closeImages = closeImages;
        vm.showImages = showImages;
        vm.resubmitDeposit = resubmitDeposit;
        vm.title = 'HistoryDetail';
        vm.deposit = historyDetailPromise;
        vm.id = historyDetailPromise.id;
        vm.account = historyDetailPromise.account;
        vm.depositAmount = historyDetailPromise.amount;
        vm.status = historyDetailPromise.status;
        vm.description = historyDetailPromise.description;
        vm.checks = historyDetailPromise.checks;
        vm.checkIndex = null;



        activate();

        ////////////////

        function activate() {
            // Create the check images modal that we will use later
            $ionicModal.fromTemplateUrl('app/history/checkImages.html', {
                scope: $scope
            }).then(function(modal) {
                vm.modal = modal;
            });
        }

        // Triggered in the check images modal to close it
        function closeImages() {
            vm.modal.hide();
            screen.unlockOrientation();
        }

        // Open the check images modal
        function showImages(index) {
            vm.checkIndex = index;
            vm.modal.show();
            screen.lockOrientation('landscape');
        }

        //Enter the process of resubmiting a deposit
        function resubmitDeposit(deposit) {
            //send deposit to service
            $state.go('app.deposit-review');
            depositService.depositObj = {};
            depositService.depositObj = deposit;
            depositService.mode = 'EDIT';
            depositService.type = deposit.type;
            console.log('going from depositDetail to depositReview: ' + depositService);
        }

    }

})();