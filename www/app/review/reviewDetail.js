(function () {
    'use strict';

    angular
        .module('app.review')
        .config(stateProvider)
        .controller('ReviewDetailController', ReviewDetailController);

    stateProvider.$inject = ['$stateProvider'];
    ReviewDetailController.$inject = ['reviewDetailPromise', '$ionicModal', '$scope', 'reviewService', '$state'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.review-detail', {
                cache: false,
                url: '/review/:id',
                views: {
                    'menuContent': {
                        templateUrl: 'app/review/reviewDetail.html',
                        controller: 'ReviewDetailController as vm',
                        resolve: {
                            reviewDetailPromise: function(reviewService, $stateParams){
                                return reviewService.getReviewDetail($stateParams.id)
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function ReviewDetailController(reviewDetailPromise, $ionicModal, $scope, reviewService, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.closeImages = closeImages;
        vm.showImages = showImages;
        vm.selectStatus = selectStatus;
        vm.title = 'Deposit Detail';
        vm.deposit = reviewDetailPromise;
        vm.id = reviewDetailPromise.id;
        vm.account = reviewDetailPromise.account;
        vm.depositAmount = reviewDetailPromise.amount;
        vm.status = reviewDetailPromise.status;
        vm.description = reviewDetailPromise.description;
        vm.checks = reviewDetailPromise.checks;
        vm.checkIndex = null;
        vm.reject = 'REJECT';
        vm.release = 'RELEASE';
        vm.approve = 'APPROVE';

        activate();

        ////////////////

        function activate() {
            // Create the check images modal that we will use later
            $ionicModal.fromTemplateUrl('app/review/checkImages.html', {
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
        function selectStatus(status) {
            //send deposit to service
            reviewDetailPromise.status = status;
            reviewService.reviewedDeposit = reviewDetailPromise;
            $state.go('app.review-description');
        }

    }
})();