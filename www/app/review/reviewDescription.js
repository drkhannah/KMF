(function () {
    'use strict';

    angular
        .module('app.review')
        .config(stateProvider)
        .controller('ReviewDescriptionController', ReviewDescriptionController);

    stateProvider.$inject = ['$stateProvider'];
    ReviewDescriptionController.$inject = ['reviewedDeposit', '$state', 'reviewService', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.review-description', {
                cache: false,
                url: '/review-description',
                views: {
                    'menuContent': {
                        templateUrl: 'app/review/reviewDescription.html',
                        controller: 'ReviewDescriptionController as vm',
                        resolve: {
                            reviewedDeposit: function(reviewService){
                                return reviewService.reviewedDeposit;
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function ReviewDescriptionController(reviewedDeposit, $state, reviewService, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.submitStatus = submitStatus;
        vm.descriptionChange = descriptionChange;
        vm.title = 'Status Description';
        vm.status = reviewedDeposit.status;
        vm.description = reviewedDeposit.description;
        activate();

        ////////////////

        function activate() {

        }

        function descriptionChange(){
            reviewedDeposit.description = vm.description;
            reviewService.reviewedDeposit = reviewedDeposit;
        }

        function submitStatus(){
            reviewService.reviewedDeposit = {};
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $ionicHistory.clearCache();
            $state.go('app.review')
        }
    }

})();