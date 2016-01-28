var app = angular.module('frnd_lst', []);

app.controller('frnd_lst_cntrlr', function($scope, $http) {

	$scope.getFriendList = function() {
		$http.get("/getFrndsM").success(function(response) {
			$scope.f_lst = [];
			if (response.status == 200) {
				$scope.f_lst = response.data;
			} else {
				console.log("Error here");
			}
		});
	};

	$scope.getPendingList = function() {
		$http({
			method : "GET",
			url : '/pendingListM',
			data : {}
		}).success(function(data) {
			$scope.pendinglist = [];
			if (data.status == 200) {
				console.log("success");
				$scope.pendinglist = data.data;
			} else {
				console.log("Error here");			}
		}).error(function(error) {
			console.log("error");
		});
	};

	$scope.acceptRequest = function(user) {
		$http({
			method : "POST",
			url : '/acceptFriendRequest',
			data : {
				'user' : user.user
			}
		}).success(function(data) {
			if (data.status == 200) {
				$scope.getPendingList();
				$scope.getFriendList();
			} else {
				console.log("Error here");
			}
		}).error(function(error) {
			console.log("error");
		});
	}

	$scope.declinedRequest = function(user) {
		$http({
			method : "POST",
			url : '/ignoreFriendRequest',
			data : {
				'user' : user.user
			}
		}).success(function(data) {
			if (data.status == 200) {
				$scope.getPendingList();
				$scope.getFriendList();
			} else {
				console.log("Error here");			}
		}).error(function(error) {
			console.log("error");
		});
	}

	$scope.getFriendList();
	$scope.getPendingList();
});
