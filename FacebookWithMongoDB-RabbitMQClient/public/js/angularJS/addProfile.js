var app = angular.module('profile', []);

app.controller('addProfileData', function($scope) {
	
	$scope.hideEducation = false;
	$scope.hideWork = true;
	$scope.hideOther = true;
	$scope.hideInterests = true;
	
	$scope.validWork = function($event){
		
		angular.forEach($scope.profileData.$error.required, function(field) {
		    field.$setDirty();
		});
		
		if($scope.profileData.schoolName.$error.required ||
				$scope.profileData.major.$error.required	|| 
				$scope.profileData.eStartDate.$error.required||
				$scope.profileData.eEndDate.$error.required){
			$event.preventDefault();
		}
		else{
			angular.forEach($scope.profileData.$error.required, function(field) {
			    field.$setPristine();
			});
			
			$scope.showWork();
		}
	};
	
	$scope.showWork = function(){
		$scope.hideEducation = true;
		$scope.hideWork = false;
	};
	
	
	$scope.validInterests = function($event){
		
		angular.forEach($scope.profileData.$error.required, function(field) {
		    field.$setDirty();
		});
		
		if($scope.profileData.companyName.$error.required ||
				$scope.profileData.position.$error.required	|| 
				$scope.profileData.wStartDate.$error.required||
				$scope.profileData.wEndDate.$error.required){
			$event.preventDefault();
		}
		else{
			angular.forEach($scope.profileData.$error.required, function(field) {
			    field.$setPristine();
			});
			$scope.showInterests();
		}
	};
	
	$scope.showInterests = function(){
		$scope.hideInterests = false;
		$scope.hideWork = true;
	}
	
	$scope.validOther = function($event){
		
		angular.forEach($scope.profileData.$error.required, function(field) {
		    field.$setDirty();
		});
		
		if($scope.profileData.music.$error.required ||
				$scope.profileData.sports.$error.required	|| 
				$scope.profileData.shows.$error.required){
			$event.preventDefault();
		}
		else{
			angular.forEach($scope.profileData.$error.required, function(field) {
			    field.$setPristine();
			});
			$scope.showOther();
		}
	};
	
	$scope.showOther = function(){
		$scope.hideInterests = true;
		$scope.hideOther = false;
	}
	
	
	$scope.validate = function($event){
		angular.forEach($scope.profileData.$error.required, function(field) {
		    field.$setDirty();
		});
		if($scope.profileData.phoneNumber.$error.required ||
				$scope.profileData.city.$error.required ||
				$scope.profileData.country.$error.required){
			$event.preventDefault();
		}
	};
	
});