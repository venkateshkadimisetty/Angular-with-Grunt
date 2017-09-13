var app = angular.module('app', ['ui.router']);
app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'app/view/login.html',
            controller: 'LoginCtrl'
        })
        .state('admin', {
            url: '/admin',
            templateUrl: 'app/view/admin.html',
            controller: 'AdminCtrl'
        });

}]);
