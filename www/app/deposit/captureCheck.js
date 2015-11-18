(function () {
    'use strict';

    angular
        .module('app.deposit')
        .config(stateProvider)
        .controller('CaptureCheckController', CaptureCheckController);

    stateProvider.$inject = ['$stateProvider'];
    CaptureCheckController.$inject = ['accountsPromise', 'depositService', '$state', '$ionicHistory', '$timeout', '$ionicPopup', '$stateParams'];

    /* @ngInject */
    function stateProvider($stateProvider){
        $stateProvider
            .state('app.capture-check', {
                cache: false,
                url: '/deposit/capture-check:hashKey',
                views: {
                    'menuContent': {
                        templateUrl: 'app/deposit/catureCheck.html',
                        controller: 'CaptureCheckController as vm',
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
    function CaptureCheckController(accountsPromise, depositService, $state, $ionicHistory, $timeout, $ionicPopup, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.accountChange = accountChange;
        vm.depositAmountChange = depositAmountChange;
        vm.miSnapCheckFront = miSnapCheckFront;
        vm.miSnapCheckBack = miSnapCheckBack;
        vm.submitCheck = submitCheck;
        vm.checkAmountChange = checkAmountChange;
        vm.cancelCheck = cancelCheck;
        vm.cancelDeposit = depositService.cancelDeposit;
        vm.editCheckHashKey = $stateParams.hashKey;
        vm.title = 'Capture Check';
        vm.depositObj = depositService.depositObj;
        vm.checkObj = depositService.checkObj;
        vm.depositAmount = depositService.depositObj.depositAmount;
        vm.accounts = accountsPromise;
        vm.selectedAccount = depositService.depositObj.account;
        vm.checkAmount = depositService.checkObj.checkAmount;
        vm.checks = depositService.depositObj.checks;
        vm.checkFrontImage = depositService.checkObj.checkFrontImage;
        vm.checkBackImage = depositService.checkObj.checkBackImage;
        vm.frontCheckLoading = false;
        vm.backCheckLoading = false;


        activate();

        ////////////////

        function activate() {
        }

        function depositAmountChange() { //keep vm.checkObj in depositService up to date
            vm.depositObj.depositAmount = vm.depositAmount;
            console.log(depositService);
        }

        function accountChange() { //keep vm.checkObj in depositService up to date
            vm.depositObj.account = vm.selectedAccount;
            console.log(depositService);
        }

        function checkAmountChange() { //keep vm.checkObj in depositService up to date
            vm.checkObj.checkAmount = vm.checkAmount;
            console.log(depositService);
        }

        function miSnapCheckFront(){ //get image of front of check

            //if(cordova !== null){
            //vm.frontCheckLoading = true;
            //cordova.exec(
            //    // Register the callback handler
            //    function callback(data) {
            //        //console.log('original Image: ' + data.OriginalImage);
            //        //console.log('Encoded Image: ' + data.EncodedImage);
            //        //console.log('result dictionary: ' + angular.toJson(data.ResultDictionary));
            //        depositService.checkFrontImage = data.EncodedImage;
            //        vm.checkFrontImage = depositService.checkFrontImage;
            //        console.log('vm.checkfrontimage : ' + vm.checkFrontImage);
            //        console.log('depositService checkfrontimage : ' + depositService.checkFrontImage);
            //        vm.frontCheckLoading = false;
            //        $state.go($state.current, {}, {reload: true});
            //        console.log('after reload vm.checkfrontimage : ' + vm.checkFrontImage);
            //        console.log('after reload depositService checkfrontimage : ' + depositService.checkFrontImage);
            //    },
            //    // Register the errorHandler
            //    function errorHandler(err) {
            //        alert('MiSnap is Cancelled: ' + err);
            //    },
            //    // Define what class to route messages to
            //    'MiSnapPlugin',
            //    // Execute this method on the above class
            //    'cordovaCallMiSnap',
            //    //Arguments
            //    []);
            //} else {
            //    alert('You need to be on a device for this to work')
            //}

            vm.frontCheckLoading = true;
            $timeout(function() {
                vm.frontCheckLoading = false;
                vm.checkObj.checkFrontImage = accountsPromise[0].checkFrontImage;
                vm.checkFrontImage = vm.checkObj.checkFrontImage;
                console.log (depositService);
            }, 3000);
        }

        function miSnapCheckBack(){ //get image of back of check
            vm.backCheckLoading = true;
            $timeout(function() {
                vm.backCheckLoading = false;
                vm.checkObj.checkBackImage = accountsPromise[0].checkBackImage;
                vm.checkBackImage = vm.checkObj.checkBackImage;
                console.log (depositService);
            }, 3000);
        }

        function submitCheck() { //submit check to alogent server
            $ionicHistory.clearCache();
            $state.go('app.deposit-review');

            //loop through checks in vm.depositObj in depositService,
            //if checks array is empty, push the check to the checks array,
            //if the array isn't empty, use hashkey to see if the check exits,
            //if check exits update the check's properties
            //if check doesn't exist, push check to checks array
            if(vm.depositObj.checks.length >= 1){
                vm.depositObj.checks.forEach(function (check) {
                    if(check.$$hashKey === vm.editCheckHashKey){
                        check.checkAmount = vm.checkAmount;
                        check.checkFrontImage = vm.checkFrontImage;
                        check.checkBackImage = vm.checkBackImage;
                    } else if(vm.editCheckHashKey === undefined || vm.editCheckHashKey === null || vm.editCheckHashKey === "" || vm.editCheckHashKey === ''){
                        vm.depositObj.checks.push({
                            "checkAmount": vm.checkAmount,
                            "checkFrontImage": vm.checkFrontImage,
                            "checkBackImage": vm.checkBackImage
                        });
                        vm.editCheckHashKey = 'New check Pushed'
                    }
                });
            } else {
                vm.depositObj.checks.push({
                    "checkAmount": vm.checkAmount,
                    "checkFrontImage": vm.checkFrontImage,
                    "checkBackImage": vm.checkBackImage
                });
            }

            //update account in vm.depositObj in depositService
            vm.depositObj.account = vm.selectedAccount;
            vm.depositObj.depositAmount = vm.depositAmount;

            //clear out vm.checkObj in depositService
            vm.checkObj.checkAmount = null;
            vm.checkObj.checkFrontImage = null;
            vm.checkObj.checkBackImage = null;
            console.log(depositService);
        }

        function cancelCheck() {
            $ionicPopup.show({
                title: "Dont Save Check",
                template: "Are you sure you don't want to save this check to your deposit?",
                buttons: [{
                    text: 'No',
                    type: 'button-stable',
                    onTap: function(e) {
                        // e.preventDefault() will stop the popup from closing when tapped.
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
                    $ionicHistory.clearCache();
                    $state.go('app.deposit-review');

                    //clear vm.checkObj in depositService
                    vm.checkObj.amount = null;
                    vm.checkObj.checkAmount = null;
                    vm.checkObj.checkFrontImage = null;
                    vm.checkObj.checkBackImage = null;
                    console.log(depositService);
                } else {
                    console.log("Don't Cancel Check Submition");
                }
            });
        }
    }

})();