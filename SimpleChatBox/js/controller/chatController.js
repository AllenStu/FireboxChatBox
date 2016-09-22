app.config(function($routeProvider) {
	$routeProvider

	// route for the home page
	.when('/', {
		templateUrl : 'pages/chooseUser.html',
		controller : 'chatController',
		
	})

	// route for the chat Room
	.when('/ChatBox', {
		templateUrl : 'pages/chatRoom.html',
		controller : 'chatController',
		
	})
	// route for the chat Room
	.when('/Home', {
		redirectTo: '/'
	})
	
	.otherwise({
        redirectTo: '/'
    });

});

app.controller('chatController', ['$scope', 'Message', 'appService',
        function($scope, Message, appService){
			
			$scope.user= "Guest";	//init
			$scope.messages= Message.all; //retrieve
			$scope.secondUser = appService.getName();
			
			$scope.talking = function(message){ //storing
				if(appService.getName() == null){
					message.user = $scope.user;
				}else{
					message.user = appService.getName();
				}
				Message.create(message);
				message.text = null;
			};	
			
			$scope.assignName = function(userval){
				if(userval == null){
					window.alert("You will be login as 'Guest'");
					appService.setName("Guest");
				}else{
					appService.setName(userval);
				}
			};
			
			
}]);
	
app.factory('Message', ['$firebase',
 	    function($firebase){
			
			var ref = new Firebase('https://chikka-chatbox.firebaseio.com'); //get the http or databaseURL
			var messages = $firebase(ref.child('messages').limitToLast(10)).$asArray();
			
			var Message = {
				all: messages,
				create: function (message) {
					return messages.$add(message);
				}
			};
		
		return Message;
}]);

app.service('appService', function() {
     var name;
     var setName = function (inputName){
    	 name=inputName;
     };
     var getName = function(){
    	 return name;
     };
     return {setName: setName, getName : getName};
});

