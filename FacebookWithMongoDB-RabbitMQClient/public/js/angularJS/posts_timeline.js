var app = angular.module('init', []);

app.controller('status', function($scope, $http) {

	$scope.submit = function() {

		$http({
			method : "POST",
			url : '/postStatusTimelineM',
			data : {
				postValue : $scope.post
			}
		}).success(function(data) {
			if (data.status == 200) {
				$scope.getTimelinePosts();
			}

			else
				window.location.assign("/DataNotFound");
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};

	$scope.validate = function($event) {
		angular.forEach($scope.addStatusTimeline.$error.required, function(
				field) {
			field.$setDirty();
		});
		if ($scope.addStatusTimeline.$error.required) {
			$event.preventDefault();
		} else {
			$scope.submit();
			$scope.post = "";
			angular.forEach($scope.addStatusTimeline.$error.required, function(
					field) {
				field.$setPristine();
			});
		}
	};

	$scope.getTimelinePosts = function() {
		$http.get("/getJsonTimelineM").success(function(response) {
			if (response.status == 200) {
				$scope.posts = response.data;
			}
		});
	};

	$scope.getTimelineDetails = function() {
		$http({
			method : "GET",
			url : '/timelineDetailsM'
		}).success(function(data) {
			if (data.status == 200) {
				var userInfo = data.data;
				$scope.wholeName = userInfo.wholeName;
				$scope.city = userInfo.city;
				$scope.country = userInfo.country;
				$scope.userId = userInfo.userId;
				$scope.companyName = userInfo.companyName;
				$scope.position = userInfo.position;
				$scope.schoolName = userInfo.schoolName;
				$scope.major = userInfo.major;

			} else {
				console.log("No datat found");
			}
		}).error(function(error) {
			console.log("error");
		});
	};
	$scope.getTimelineDetails();
	$scope.getTimelinePosts();
});
