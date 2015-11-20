controllers.controller('indexCtrl', ['$scope', '$http', '$websocket', '$q', '$rootScope', function($scope, $http, $websocket, $q, $rootScope) {
		$scope.placeholder = "type in some message here!";
		$scope.ws;
		$scope.msgArray = [];
		$scope.submit = function(){
			if(!$scope.ws){				
				$scope.ws = $websocket.$new('ws://localhost:8088/VChatWebsocket/websocket');
			} else {
				$scope.msgArray = [];
				$rootScope.$apply()
				$scope.ws.$emit($scope.prePopulateTextarea);
			}
			if($scope.ws.$status() == 3){
				$scope.ws.$open();
			}
			console.log("status after sumbit: " + $scope.ws.$status());			
			//callback to hanlde opne and send a message to server
			$scope.ws.$on('$open', function () {
				console.log("callback: $open");
				console.log("status inside $open: " + $scope.ws.$status());
				if($scope.ws.$status() == 1){					
					$scope.msg = "Opening...";
					$scope.msgArray.push('Opening connection...');
					$rootScope.$apply();
					$scope.ws.$emit($scope.prePopulateTextarea);
					$scope.msg = "Sending to more to server...";
					$scope.msgArray.push('Sending to more to server...');
					$rootScope.$apply()
				}
			});
			
			//callback function to handle a message coming from server
			$scope.ws.$on('$message', function (messageFromServer) { 
				console.log("callback: $message");
				console.log("status inside $message: " + $scope.ws.$status());

				console.log('something incoming from the server: ' + messageFromServer);
				$scope.postPopulateTextarea = messageFromServer;
				$scope.msg = "Message received from server!";
				if($scope.msgArray.length == 0){
					$scope.msgArray.push('Message received from server!');
					$rootScope.$apply();
				} else {					
					$scope.msgArray.push('Message received from server!');
					$rootScope.$apply();
				}
			});	
			
			//callback function to handle when the socket get closed
			$scope.ws.$on('$close', function () {
				console.log("callback: $close");
				if($scope.ws != null){					
					console.log("status inside $close: " + $scope.ws.$status());
					$scope.ws = null;
					$scope.msg = "Connection closed!";
					$scope.msgArray.push('Connection closed!');
					$rootScope.$apply();
					console.log("connection closed.");
				}				
		    });
			
			$scope.ws.$on('$error', function (){
				console.log("callback: $error");
				console.log("status inside $error: " + $scope.ws.$status());
				
				alert('Error...');
			});
		}
		
		$scope.close = function(){
			$scope.ws.$close();
		}
		
		$scope.clear = function(){
			$scope.prePopulateTextarea = "";
			$scope.postPopulateTextarea = "";
			$scope.msgArray = [];
		}
		
		
		
		
		
		
		
		
		//-----------------------old js websocket code-----------------
		function oldCode(){
			/*var request = $scope.prePopulateTextarea;
			var location = "ws://localhost:8086/PS-DeviceManagerClient/pinpad"; 
			var ws = new WebSocket(location);

			ws.onopen = function() {
				ws.send(request);
		 	};	
		 	
		 	ws.onmessage = function(message){
				alert("Server: " + message.data);  
				$("textarea#response").val(message.data);
				ws.close();
			};
			
			ws.onclose = function() {
				console.log("Connection closed");
			}*/
		}
    }
]);