var app = angular.module('toolrentalsimulator', [
    'toolrentalsimulator.controllers',
    'toolrentalsimulator.services',
    'toolrentalsimulator.directives',
    'toolrentalsimulator.filters',
    'ui.router',
    'ui.bootstrap',
    'hljs',
    'ui.codemirror',
    'ngWebsocket'
]).config(function($urlRouterProvider, $stateProvider) {
    'use strict';  
    $urlRouterProvider.when("/", "home");
    $urlRouterProvider.when("#/chat", "/chat");
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
    .state("home", {
        url: "/home",
        templateUrl: "app/view/index.html",
        controller: "indexCtrl"
    }).state("chat", {
        url: "/chat",
        templateUrl: "app/view/chat/chat.html",
        controller: "chatCtrl"
    });
});

var controllers = angular.module('toolrentalsimulator.controllers', []);
var services = angular.module('toolrentalsimulator.services', []);
var directives = angular.module('toolrentalsimulator.directives', []);
var filters = angular.module('toolrentalsimulator.filters', []);

controllers.controller('MainCtrl', ['$scope', '$state', '$rootScope',
    function($scope, $state, $rootScope) {
        $scope.test = function(){
            alert();
        };
    }
]);