"use strict";

app.controller("registerCtrl", function($scope, $window, AuthFactory, $location){

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () => {
    	console.log("you clicked register");
	    AuthFactory.createUser({
	      email: $scope.account.email,
	      password: $scope.account.password
	    })
	    .then( (userData) => {
	      console.log("controller.register", userData );
	      AuthFactory
	    .loginUser($scope.account)
	    .then( () => {
	        $window.location.href = "#!/items/list";
	  	    }, (error) => {
	        console.log("Error creating user:", error);
	    	});
		});
	};
});