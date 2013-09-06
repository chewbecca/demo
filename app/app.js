'use strict';

// GLOBAL FIREBASE REFENCES
var fbMain = new Firebase("http://balihoo-demo.firebaseio.com/");
var fbTactics = new Firebase("http://balihoo-demo.firebaseio.com/tactics");
//var fbItems = new Firebase("http://scout-local.firebaseio.com/items");

// CAMPAIGN MODULE
var campaignApp = angular.module('campaign', ['firebase']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/home', {
			templateUrl: 'app/views/home.html',
			 controller: 'HomeCtrl',
			 authRequired: false
		});
		$routeProvider.otherwise({redirectTo: '/home'}); // TODO: Add Auth Conditional, also place all "whens" under one routeProvider
	}]);

campaignApp.controller('MyCtrl2',['$scope', 'angularFireCollection', 

	function scopeAssignments($scope, angularFireCollection){

		// So for creating a data bound to users I need to pass in the user object. Then namespace of the account ID when I create campaigns $scope.campaigns = userID.fbCampaigns;

		$scope.items = angularFireCollection(fbItems);

}]);

// TACTIC MODULE
var tacticApp = angular.module('tactic', ['firebase']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/new-tactic', {
			templateUrl: 'app/views/tactic/new.html',
			 controller: 'NewTacticCtrl'
		});
		$routeProvider.when('/edit-tactic', {
			templateUrl: 'app/views/tactic/edit.html',
			 controller: 'EditTacticCtrl'
		});
		$routeProvider.when('/my-tactics', {
			templateUrl: 'app/views/tactic/list.html',
			 controller: 'ListTacticCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/my-tactics'}); // TODO: Add Auth Conditional, also place all "whens" under one routeProvider
	}]);



tacticApp.controller('NewTacticCtrl',['$scope', 'angularFireCollection','$location', 

	function scopeAssignments($scope, angularFireCollection, $location){

		// So for creating a data bound to users I need to pass in the user object. Then namespace of the account ID when I create campaigns $scope.campaigns = userID.fbCampaigns;

		$scope.tactics = angularFireCollection(fbTactics);
//
		//$scope.changeView = function(view){
//
		//	$location.path(view);
//
		//}

		$scope.changeView = function(view) {
			$location.path(view);
		}

}]);



tacticApp.controller('EditTacticCtrl',['$scope', 'angularFireCollection', 

	function scopeAssignments($scope, angularFireCollection){

		// So for creating a data bound to users I need to pass in the user object. Then namespace of the account ID when I create campaigns $scope.campaigns = userID.fbCampaigns;

		$scope.tactics = angularFireCollection(fbTactics);

}]);



tacticApp.controller('ListTacticCtrl',['$scope', 'angularFireCollection', 

	function scopeAssignments($scope, angularFireCollection){

		// So for creating a data bound to users I need to pass in the user object. Then namespace of the account ID when I create campaigns $scope.campaigns = userID.fbCampaigns;

		//ng-submit="tactics.remove(tactic)"

		$scope.remove = function(array, index){
			array.splice(index, 1);
		}

		$scope.tactics = angularFireCollection(fbTactics);

}]);