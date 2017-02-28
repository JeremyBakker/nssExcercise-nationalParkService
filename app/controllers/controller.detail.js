"use strict";

app.controller('detailCtrl', function($scope, $window, AuthFactory, forestFactory){
	let user = AuthFactory.getUser();
	console.log("user", user);
	
	forestFactory.getFavoriteParks(user)
	.then((data)=>{$scope.forests = data;
	console.log("data", data);
	});

	$scope.delete = (event) => {
		forestFactory.deleteFavoriteParks(event)
		.then(function(response){
            forestFactory.getFavoriteParks(user).then(function(data){
                $scope.forests = data;
            });
        });
    };
});