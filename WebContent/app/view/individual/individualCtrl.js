controllers.controller('individualCtrl', ['$scope', 'socketUtils', '$rootScope', function($scope, socketUtils, $rootScope) {
		$scope.ws = null;
		var port = "8088";
		var uri = "individual";
		var uuid = generateUUID();
		
		$scope.sendMsg = function(){
			if(!$scope.ws){		
				socketUtils.setSocket(port, uri);
				$scope.ws = socketUtils.getSocket(); 
				$scope.ws.$open();
				console.log("status: " +$scope.ws.$status());
			} else {
				//console.log("message to server: " + JSON.stringify(messageObj));
				//$scope.ws.$emit(name + " say: " + JSON.stringify(messageObj));
				$scope.ws.$emit("message: " + $scope.message + " UUID: " + uuid);
			}
			
			//callback to handle open and send a message to server
			$scope.ws.$on('$open', function () {
				console.log("$open");
				//console.log("message to server: " + JSON.stringify(messageObj));
				//$scope.ws.$emit(name + " say: " + JSON.stringify(messageObj));
				$scope.ws.$emit("message: " + $scope.message + " UUID: " + uuid);
			});
			
			//callback function to handle a message coming from server
			$scope.ws.$on('$message', function (messageFromServer) { 
				console.log("$message");
				console.log('something incoming from the server: ' + messageFromServer);
				$scope.msg = messageFromServer;
				$rootScope.$apply()
			});	
			
			//callback function to handle when the socket get closed
			$scope.ws.$on('$close', function () {
				console.log("$close");
				$scope.ws = null;
				console.log("chat connection closed.");
		    });
			
			$scope.ws.$on('$error', function (){
				console.log("$error");
				console.log("status inside $error: " + $scope.ws.$status());
				alert('Error...');
			});
		};
		
		function generateUUID() {
		    var d = new Date().getTime();
		    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		        var r = (d + Math.random()*16)%16 | 0;
		        d = Math.floor(d/16);
		        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		    });
		    return uuid;
		};
    }
]);