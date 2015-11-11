(function () {
    'use strict';

    angular
        .module('app', [

            /* everyone has access to these */
            'app.core',

            /* Features */
            'app.deposit',
            'app.history',
            'app.review',
            'app.signin',
            'app.layout'
        ])

})();