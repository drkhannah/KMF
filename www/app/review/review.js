(function () {
    'use strict';

    angular
        .module('app.review')
        .config(stateProvider)
        .controller('ReviewController', ReviewController);

    stateProvider.$inject = ['$stateProvider'];
    ReviewController.$inject = ['reviewPromise'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.review', {
                cache: false,
                url: '/review',
                views: {
                    'menuContent': {
                        templateUrl: 'app/review/review.html',
                        controller: 'ReviewController as vm',
                        resolve: {
                            reviewPromise: function(reviewService){
                                return reviewService.getDeposits();
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function ReviewController(reviewPromise) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'Deposit Review';
        vm.deposits = reviewPromise.deposits;
        activate();

        ////////////////

        function activate() {

        }
    }

})();