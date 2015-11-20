services.factory('socketUtils', ['$websocket', function($websocket) {
	var ws = null;
	var socketData = {
	        setSocket: function(port, uri) {
	        	ws = $websocket.$new('ws://localhost:'+ port +'/VChatWebsocket/' + uri);
	        },
	        getSocket: function() {
	            return ws;
	        }
	    };
	return socketData;
}]);