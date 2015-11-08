(function () {
    'use strict';

    angular
        .module('app.signin')
        .config(stateProvider)
        .controller('QuestionsController', QuestionsController);

    stateProvider.$inject = ['$stateProvider'];
    QuestionsController.$inject = ['signinService', '$state', '$ionicHistory'];

    /* @ngInject */
    function stateProvider($stateProvider) {
        $stateProvider
            .state('securityQuestions', {
                cache: false,
                url: '/securityQuestions',
                templateUrl: 'app/signin/securityQuestions.html',
                controller: 'QuestionsController as vm'
            });
    }

    /* @ngInject */
    function QuestionsController(signinService, $state, $ionicHistory) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.answerQuestion = answerQuestion;
        vm.answerChange = answerChange;
        vm.title = 'Security Questions';
        vm.questionAnswered = signinService.questionAnswered;
        vm.userAnswer = signinService.userAnswer;

        activate();

        ////////////////

        function activate() {
        }

        function answerQuestion(){
            if(signinService.userAnswer === 'answer') {
                signinService.submitAnswer().then(function () {
                    signinService.questionAnswered = true;
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $ionicHistory.clearCache();
                    $state.go('terms');
                })
            }
        }

        function answerChange() {
            signinService.userAnswer = vm.userAnswer;
        }

    }
})();