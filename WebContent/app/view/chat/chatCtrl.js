controllers.controller('chatCtrl', ['$scope', 'socketUtils', '$rootScope', function($scope, socketUtils, $rootScope) {
		$scope.msg = "Let's send some message shall we?";
		var port = "8088";
		var uri = "chatsocket";
		$scope.ws;
		var name;
		$scope.joined = false;
		
		$scope.sendMsg = function(){
			$scope.ws.$emit($scope.message);

			console.log("status after sumbit: " + $scope.ws.$status());			
			//callback to handle open and send a message to server
			$scope.ws.$on('$open', function () {
				console.log("$open");
				if($scope.ws.$status() == 1){					
					console.log(name + " say: " + $scope.message);
					$scope.ws.$emit(name + " say: " + $scope.message);
				}
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
				if($scope.ws != null){					
					console.log("status inside $close: " + $scope.ws.$status());
					$scope.ws = null;
					console.log("chat connection closed.");
				}				
		    });
			
			$scope.ws.$on('$error', function (){
				console.log("$error");
				console.log("status inside $error: " + $scope.ws.$status());
				alert('Error...');
			});
		};
		
		$scope.exit = function(){
			//$scope.ws.$close();
			console.log("close button clicked status is: " + $scope.ws.$status());
			if($scope.ws != null){
				$scope.ws = null;
				$scope.status = "Disconnted!";
				$scope.joined = false;
			}
		};
		
		$scope.join = function(){
			name = $scope.name;
			console.log("name joined is: " + name);
			if(!$scope.ws){		
				socketUtils.setSocket(port, uri);
				$scope.ws = socketUtils.getSocket(); 
				$scope.ws.$open();
				$scope.status = "Connected!";
				console.log("status: " +$scope.ws.$status());
				$scope.joined = true;
			}
		};
    }
]);