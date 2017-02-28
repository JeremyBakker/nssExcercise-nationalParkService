"use strict";

app.controller('homeCtrl', function($scope, $location, forestFactory, AuthFactory, $window){
	
	forestFactory.getParks()
	.then((data)=> $scope.forests = data); 

	$scope.addNewFavorite = function(){
       forestFactory.addFavoriteParks(this.forest);
    };

   	$scope.logout = function (){
		console.log("logout clicked");
		AuthFactory.logoutUser()
		.then(function(data){
			console.log("logged out?", data);
			$window.location.url = "#!/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

});