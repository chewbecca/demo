'use strict';



// GLOBAL FIREBASE REFENCES (TODO: Research if it would be better to just call one Firebase and access the different directories from within the template.
var fbMain = new Firebase("http://balihoo-demo.firebaseio.com/");
var fbTactics = new Firebase("http://balihoo-demo.firebaseio.com/tactics");
var fbCampaigns = new Firebase("http://balihoo-demo.firebaseio.com/campaigns");



// CAMPAIGN MODULE
var campaignApp = angular.module('campaign', ['firebase']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/new-campaign', {
			templateUrl: 'app/views/campaign/new.html',
			 controller: 'NewCampaignCtrl'
		});
		$routeProvider.when('/my-campaigns', {
			templateUrl: 'app/views/campaign/list.html',
			 controller: 'ListCampaignCtrl'
		});
		$routeProvider.otherwise({redirectTo: '/my-campaigns'}); // TODO: Add Auth Conditional, also place all "whens" under one routeProvider
	}]);



// CAMPAIGN CONTROLLERS
campaignApp.controller('NewCampaignCtrl',['$scope', 'angularFireCollection','$location', 

	function scopeAssignments($scope, angularFireCollection, $location){

		$scope.tactics = angularFireCollection(fbTactics);
		$scope.campaigns = angularFireCollection(fbCampaigns);

		$scope.changeView = function(view) {
			$location.path(view);
		}

		// SAMPLE DATA SET
		$scope.campaign = { "meta" : {

			"tactics" : []

		}

		};

		// TODO: Create a Local array, then push that array into an new firebase obj

		// TODO: Possibly build a switch that can handle transfering tactic.type and tranfering it to a boolean for icons. 

}]);

campaignApp.controller('ListCampaignCtrl',['$scope', 'angularFireCollection', 

	function scopeAssignments($scope, angularFireCollection){

		$scope.campaigns = angularFireCollection(fbCampaigns);
		$scope.tactics = angularFireCollection(fbTactics);

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




// TACTIC CONTROLLERS
tacticApp.controller('NewTacticCtrl',['$scope', 'angularFireCollection','$location', 

	function scopeAssignments($scope, angularFireCollection, $location){

		$scope.tactics = angularFireCollection(fbTactics);

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

		$scope.tactics = angularFireCollection(fbTactics);

}]);