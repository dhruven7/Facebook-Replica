var app = angular.module('groups_user', []);

app.controller('group_list', [
		'$scope',
		'$http',
		'$location',
		function($scope, $http, $location) {

			$scope.groupList = [];

			$scope.navigateToGroup = function(group) {
				window.location.href = "/groupInfoPageM?group_id="
						+ group.groupId;
			};

			$scope.getGroupList = function() {
				$http({
					method : "GET",
					url : '/getGroupListM',
				}).success(function(data) {

					if (data.status == 200) {
						console.log("success");
						$scope.groupList = data.data;
					} else {

					}
				}).error(function(error) {
					console.log("error");
				});

			};

			$scope.getGroupList();
		} ]);
