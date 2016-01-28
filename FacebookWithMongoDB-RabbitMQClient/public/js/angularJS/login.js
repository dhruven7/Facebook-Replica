var app = angular.module('login', []);

app.controller('signup', function($scope) {	
	$scope.validate = function($event){
		angular.forEach($scope.signUpForm.$error.required, function(field) {
		    field.$setDirty();
		});
		if($scope.signUpForm.$error.required){
			$event.preventDefault();
		}		
	}	
});