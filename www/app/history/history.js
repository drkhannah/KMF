(function () {
    'use strict';

    angular
        .module('app.history')
        .config(stateProvider)
        .controller('HistoryController', HistoryController);

    stateProvider.$inject = ['$stateProvider'];
    HistoryController.$inject = ['historyPromise'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.history', {
                url: '/history',
                views: {
                    'menuContent': {
                        templateUrl: 'app/history/history.html',
                        controller: 'HistoryController as vm',
                        resolve: {
                            historyPromise: function(historyService){
                                return historyService.loadHistory();
                            }
                        }
                    }
                }
            })
    }

    /* @ngInject */
    function HistoryController(historyPromise) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.title = 'History';
        vm.history = historyPromise.deposits;
        activate();

        ////////////////

        function activate() {

        }
    }

})();