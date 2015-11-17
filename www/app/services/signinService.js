(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('signinService', signinService);

    signinService.$inject = ['$http', '$q'];

    /* @ngInject */
    function signinService($http, $q) {
        var service = {
            signin: signin,
            submitAnswer: submitAnswer,
            submitTerms: submitTerms,
            logout: logout,
            access: false,
            username: null,
            password: null,
            namePass: false,
            userAnswer: null,
            questionAnswered: false,
            termsAccepted: false,
            role: null
        };

        return service;

        ////////////////

        function signin() {
            var defer = $q.defer();
            $http.get('data/signin.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function(error){
                    console.log('signin error: ' + error);
                });
            return defer.promise;
        }

        function submitAnswer() {
            var defer = $q.defer();
            $http.get('data/signin.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function(error){
                console.log('signin error: ' + error);
            });
            return defer.promise;
        }

        function submitTerms() {
            var defer = $q.defer();
            $http.get('data/signin.json')
                .success(function (data) {
                    defer.resolve(data);
                }).error(function(error){
                console.log('signin error: ' + error);
            });
            return defer.promise;
        }

        function logout() {
            var defer = $q.defer();
            $http.get('data/signin.json')
                .success(function (data) {
                    defer.resolve(data);
                    service.access = false;
                    service.username = null;
                    service.password = null;
                    service.namePass = false;
                    service.userAnswer = null;
                    service.questionAnswered = false;
                    service.termsAccepted = false;
                    service.role = null;
                }).error(function(error){
                console.log('signin error: ' + error);
            });
            return defer.promise;
        }
    }

})();