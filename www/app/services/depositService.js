(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('depositService', depositService);

    depositService.$inject = ['$http', '$q', '$ionicHistory', '$state', '$ionicPopup'];

    /* @ngInject */
    function depositService($http, $q, $ionicHistory, $state, $ionicPopup) {
        var service = {
            loadAccounts: loadAccounts,
            cancelDeposit: cancelDeposit,
            checkObj: {
                checkAmount: null,
                checkFrontImage: null,
                checkBackImage: null
            },
            depositObj: {
                account: null,
                checksTotalAmount: null,
                depositAmount : null,
                checks: [],
                status: null,
                type: null,
                mode: null
            }
        };

        return service;

        ////////////////

        function loadAccounts() {
            var defer = $q.defer();
            $http.get('data/depositAccounts.json')
                .success(function(data){
                    defer.resolve(data);
                })
                .error(function (error) {
                    console.log('loadAccounts() error:' + error)
                });
            return defer.promise;
        }

        function cancelDeposit() {

            $ionicHistory.nextViewOptions({
                disableBack: true
            });

            $ionicPopup.show({
                title: "Cancel Deposit",
                template: "Are you sure you want to completely cancel this deposit?",
                buttons: [{
                    text: 'No',
                    type: 'button-stable',
                    onTap: function(e) {
                        // e.preventDefault() will stop the popup from closing when tapped.
                        //e.preventDefault();
                        return false;
                    }
                }, {
                    text: 'YES',
                    type: 'button-positive',
                    onTap: function(e) {
                        // Returning a value will cause the promise to resolve with the given value.
                        return true;
                    }
                }]
            }).then(function(res) {
                if(res) {
                    service.checkObj.depositAmount = null;
                    service.checkObj.checkAmount= null;
                    service.checkObj.checkFrontImage= null;
                    service.checkObj.checkBackImage= null;
                    service.depositObj.depositAmount = null;
                    service.depositObj.account= null;
                    service.depositObj.checksTotalAmount= null;
                    service.depositObj.checks=  [];
                    service.depositObj.status= null;
                    service.depositObj.type = null;
                    service.depositObj.mode= null;
                    $ionicHistory.clearCache();
                    $state.go('app.deposit');

                    console.log ('depositService Object: ' + angular.toJson(service));
                } else {
                    console.log("Still doing deposit");
                }
            });
        }

    }
    
})();