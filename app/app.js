'use strict';

// GLOBAL FIREBASE REFENCES
var fb = new Firebase("http://scout-local.firebaseio.com/");
var fbItems = new Firebase("http://scout-local.firebaseio.com/items");

// USER AUTH
var isAuthorized = false;
var auth = new FirebaseSimpleLogin(fb, function(error, user) {
	//$(".spinner").show();
	if (error) {
		// ERROR OCCURRED DURING LOGIN
		console.log(error);
		isAuthorized = false;
	} else if (user) {
		// USER AUTHENTICATED SUCCESSFULLY
		$(".spinner").hide(); // Spinner
		$(".loginForm").removeClass("show"); // Spinner
		$(".loginForm").addClass("hide"); // Spinner
		$(".dropdown").removeClass("hide"); // user dropdown
		$(".dropdown").addClass("show"); // user dropdown
		$(".username").remove();
		$(".dropdown").prepend('<a href="#" class="dropdown-toggle username" data-toggle="dropdown">' + user.email + '<b class="caret"></b></a>');
		isAuthorized = true;
		console.log('Successful login as ' + user.email + ', Provider: ' + user.provider);
	} else {
		// USER IF LOGGED OUT
		isAuthorized = false;
		$(".spinner").hide();
		console.log("User is logged out.");
	}
});

var logout = function(){
	auth.logout();
	$(".dropdown").removeClass("show"); // user dropdown
	$(".dropdown").addClass("hide"); // user dropdown
	$(".signIn").removeClass("hide"); // user dropdown
	$(".signIn").addClass("show"); // user dropdown
	console.log("The User has logged out.");
}

// APP INIT MODULE
var balihooApp = angular.module('balihoo', ['firebase']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'app/views/home.html',
			 controller: 'HomeCtrl',
			 authRequired: false
		});
		$routeProvider.when('/signup', {
			templateUrl: 'app/views/signup.html',
			 controller: 'SignupCtrl',
			 authRequired: false
		});
		$routeProvider.when('/view1', {
			templateUrl: 'app/views/view1.html', 
			controller: 'MyCtrl1',
			authRequired: true
		});
		$routeProvider.when('/view2', {
			templateUrl: 'app/views/view2.html', 
			controller: 'MyCtrl2',
			authRequired: true
		});
		$routeProvider.otherwise({redirectTo: '/home'}); // TODO: Add Auth Conditional, also place all "whens" under one routeProvider
	}]);


// CONTROLLERS
balihooApp.controller('NavCtrl',['$scope','angularFireAuth', 

	function scopeAssignments($scope, angularFireAuth){

	angularFireAuth.initialize(fb, {scope: $scope, name: "user"})

	$scope.showLogin = function(){
		$scope.sign_log = 'hide';
		$scope.loginForm_ng = 'show';
	}

	$scope.login = function(){

		auth.login('password', {
			email: $scope.username,
			password: $scope.password
		});
	}

	$scope.logout = logout;

}]);

balihooApp.controller('HomeCtrl',['$scope', 

	function scopeAssignments($scope){


}]);

balihooApp.controller('SignupCtrl',['$scope', 'angularFireAuth', 

	function scopeAssignments($scope, angularFireAuth){
		// Auth stuff here?

}]);

balihooApp.controller('MyCtrl1',['$scope', 'angularFireCollection', 

	function scopeAssignments($scope){

}]);

balihooApp.controller('MyCtrl2',['$scope', 'angularFireCollection', 

	function scopeAssignments($scope, angularFireCollection){

		// So for creating a data bound to users I need to pass in the user object. Then namespace of the account ID when I create campaigns $scope.campaigns = userID.fbCampaigns;

		$scope.items = angularFireCollection(fbItems);

}]);