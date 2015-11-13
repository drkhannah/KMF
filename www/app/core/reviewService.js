(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('reviewService', reviewService);

    reviewService.$inject = ['$http', '$q'];

    /* @ngInject */
    function reviewService($http, $q) {
        var service = {
            getDeposits : getDeposits,
            getReviewDetail: getReviewDetail,
            reviewedDeposit: {}
        };

        return service;

        ////////////////

        function getDeposits() {
            var defer = $q.defer();
            $http.get('data/history.json')
                .success(function (data) {
                    defer.resolve(data);
                })
                .error(function(error){
                    console.log('getDeposits() error: ' + error);
                });
            return defer.promise;
        }

        function getReviewDetail(id) {
            var defer = $q.defer();
            $http.get('data/historyDetail' + id + '.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function(error){
                    console.log('getReviewDetail error: ' + error);
                });
            return defer.promise;
        }
    }

})();