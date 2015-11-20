services.factory('UtilsSvc', ['$modal', '$http', '$location',
    function($modal, $http, $location) {
        'use strict';
        var this_service = {
            getCookie: function(name) {
                var value = "; " + document.cookie;
                var parts = value.split("; " + name + "=");
                if (parts.length == 2) return parts.pop().split(";").shift();
            },
            parseDate: function(date) {
                return moment(date, moment.ISO_8601).toDate();
            },
            logout: function() {
                this_service.eraseCookieFromAllPaths('THDSSO');
                this_service.eraseCookieFromAllPaths('JSESSIONID');

                $http({
                    url: "logout",
                    method: "GET"
                }).success(function(data){
                    if(data === "success"){
                        window.location.href = '/COMSupport';
                    } else {
                        console.error('failed to log out');
                        return;
                    }
                }).error(function(error){
                    console.error('failed to log out', error);
                });
            },
            eraseCookieFromAllPaths: function(name) {
                var pathBits = location.pathname.split('/');
                var pathCurrent = ' path=';

                document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';

                for (var i = 0; i < pathBits.length; i++) {
                    pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
                    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;' + pathCurrent + '; Domain=.homedepot.com';
                }
            },
            customError: function(message, title) {
                return $modal.open({
                    templateUrl: 'app/utils/modal_error.html',
                    controller: ['$scope', '$modalInstance',
                        function($scope, $modalInstance) {

                            $scope.message = message;
                            $scope.title = '';

                            if(title !== undefined) {
                                $scope.title = title;
                            }

                            $scope.confirm = function() {
                                $modalInstance.close();
                            };

                            $scope.dismiss = function() {
                                $modalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            },
            confirm: function(message) {
                return $modal.open({
                    templateUrl: 'app/utils/modal_confirm.html',
                    controller: ['$scope', '$modalInstance',
                        function($scope, $modalInstance) {

                            $scope.message = message;

                            $scope.cancel = function() {
                                $modalInstance.dismiss('cancel');
                            };

                            $scope.confirm = function() {
                                $modalInstance.close();
                            };
                            
                            $scope.dismiss = function() {
                                $modalInstance.dismiss('cancel');
                            };
                        }
                    ]
                });
            },
            alert: function(message) {
                return $modal.open({
                    templateUrl: 'app/utils/modal_error.html',
                    controller: ['$scope', '$modalInstance',
                        function($scope, $modalInstance) {
                            var errorMessage = '';

                            switch (message.status) {
                                case 400:
                                    errorMessage = '400: Bad Request';
                                    break;
                                case 401:
                                    errorMessage = 'Unauthorized';
                                    break;
                                default:
                                    errorMessage = 'There was an error with your request. Please try again at a later time.';
                                    break;
                            }

                            $scope.message = errorMessage;

                            $scope.confirm = function() {
                                $modalInstance.close();
                            };
                        }
                    ]
                });
            }
        };

        return this_service;
    }
]);