var app = angular.module('homepage', []);

app.controller('group', [ '$scope', '$http', function($scope, $http) {

} ]);

app.controller('leftbar_list', [
		'$scope',
		'$http',
		'$location',
		function($scope, $http, $location) {

			$scope.groupTopList = [];

			$scope.navigateToGroup = function(group) {
				window.location.href = "/groupInfoPage?group_id="
						+ group.groupid;
			};

			$scope.getGroupTopList = function() {
				$http({
					method : "GET",
					url : '/getGroupTopList',
					data : {
						'user_id' : 1
					}
				}).success(function(data) {
					if (data.status == 1) {
						console.log("success");
						$scope.groupTopList = data.data;
					} else {

					}
				}).error(function(error) {
					console.log("error");
				});

			};

			$scope.createGroup = function() {
				$http({
					method : "POST",
					url : '/createGroup',
					data : {
						'group_name' : $scope.group_name,
						'group_desc' : $scope.group_desc,
						'add_friends' : $scope.selected_friends
					}
				}).success(function(data) {
					if (data.status == 1) {
						console.log("success");
						$('#createGroup').modal('hide');
					} else {
					}
				}).error(function(error) {
					console.log("error");
				});

			};

			$scope.getFrienList = function() {
				$http.get("/getFrnds").success(function(response) {
					if (response.statusCode == 200) {
						$scope.friendList = response.status;
					} else {

					}
				});
			}
			
			$scope.getUserName = function(){
				$http({
					method : "POST",
					url : '/getUserName',
					data : {
						
					}
				}).success(function(data) {
					if (data.status == 1) {
						$scope.Username = data.data;
					} else {
						$scope.Username = "No Username";
					}
				}).error(function(error) {
					console.log("error");
				});

			}

			
			$scope.validate = function($event){
				angular.forEach($scope.groupCreate.$error.required, function(field) {
				    field.$setDirty();
				});
				if($scope.groupCreate.$error.required){
					$event.preventDefault();
				}
				else{
					$scope.groupCreate.group_name = "";
					$scope.groupCreate.group_desc = "";
					$scope.createGroup();
				}
			};
			
			$scope.getUserName();			
			$scope.getGroupTopList();
		} ]);

