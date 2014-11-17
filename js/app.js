angular.module('firebasePage', ['firebase', 'ngSanitize', 'ngRoute']);
angular.module('firebasePage').constant('FIREBASE_URL','https://enpresentation.firebaseio.com/');

angular.module('firebasePage').controller('BroadcastController', ["$scope",  "$firebase", "FIREBASE_URL", "$location",
	function($scope, $firebase, FIREBASE_URL, $location) {

	$scope.data = $firebase(new Firebase(FIREBASE_URL));
	$scope.data.$on('loaded', changePages);
	$scope.data.$on('change', changePages);

	var slides = [
		"bored",
		"step-2",
		"step-3",
		"title",
		"its",
		"big",
		"tiny",
		"ing",
		"imagination",
		"source",
		"one-more-thing",
		"its-in-3d",
		"overview"
	];

	function changePages(){
		var csl = $scope.data.currentslide;
		window.document.getElementById(slides[csl]).click();
	}


}]);


angular.module('firebasePage').controller('controls', ["$scope",  "$firebase", "FIREBASE_URL",
	function($scope, $firebase, FIREBASE_URL) {

	$scope.data = $firebase(new Firebase(FIREBASE_URL));


	$scope.up = function(){
		var next = $scope.data.currentslide + 1;
		if (next > 12) {
			next = 0;
			$scope.data.currentslide = 0
		}
		$scope.data.$set({"currentslide": next});
	};

	$scope.down = function(){
		var prev = $scope.data.currentslide - 1;

		if (prev < 0) {
			prev = 12;
			$scope.data.currentslide = 12
		}
		$scope.data.$set({"currentslide": prev});
	};

	$scope.goto = function(index){
		$scope.data.$set({"currentslide": index});
	};

	$scope.slides = [
			"bored",
			"step-2",
			"step-3",
			"title",
			"its",
			"big",
			"tiny",
			"ing",
			"imagination",
			"source",
			"one-more-thing",
			"its-in-3d",
			"overview"
		];


}]);
