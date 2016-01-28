var app = angular.module('init', []);

app.controller('status', function($scope, $http) {

	$scope.submit = function() {

		$http({
			method : "POST",
			url : '/postStatusM',
			data : {
				postValue : $scope.post
			}
		}).success(function(data) {
			if (data.status == 200) {
				$scope.getNewsFeed();
			}

			else
				window.location.assign("/DataNotFound");
		}).error(function(error) {
			$scope.unexpected_error = false;
			$scope.invalid_login = true;
		});
	};

	$scope.getNewsFeed = function() {
		$http.get("/newsFeedM").success(function(response) {
			if (response.status == 200) {
				$scope.posts = response.data.posts;
				console.log(JSON.stringify($scope.posts));
			}
		});
	};

	$scope.validate = function($event) {
		angular.forEach($scope.addStatus.$error.required, function(field) {
			field.$setDirty();
		});
		if ($scope.addStatus.$error.required) {
			$event.preventDefault();
		} else {
			$scope.submit();
			$scope.post = "";
			angular.forEach($scope.addStatus.$error.required, function(field) {
				field.$setPristine();
			});
		}
	};

	$scope.getNewsFeed();
});
