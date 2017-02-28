"use strict";

app.controller("loginCtrl", function($scope, $window, AuthFactory, $location){

	$scope.account = {
		email: "",
		password: ""
	};

	let logout = () => {
		console.log("logout clicked");
		AuthFactory.logoutUser()
		.then(function(data){
			console.log("logged out?", data);
			$window.location.url = "#!/login";
		}, function(error){
			console.log("error occured on logout");
		});
	};

	if(AuthFactory.isAuthenticated()){
		logout();
	}

  	$scope.login = () => {
    	console.log("you clicked login");
    	AuthFactory
	    .loginUser($scope.account)
	    .then( () => {
	        $window.location.href = "#!/home";
	    });
	};

	$scope.loginGoogle = () => {
		console.log("you clicked login with Google");
		AuthFactory.authWithProvider()
		.then(function(result) {
	    	var user = result.user.uid;
	    	console.log("logged in user:", user);
	    	$location.path("/home");
	    	$scope.$apply();
	  	}).catch(function(error) {
	    	// Handle the Errors.
	    	console.log("error with google login", error);
	    	var errorCode = error.code;
	    	var errorMessage = error.message;
	    	// The email of the user's account used.
	    	var email = error.email;
	    	// The firebase.auth.AuthCredential type that was used.
	    	var credential = error.credential;
	    	// ...
	  	});
	};

});