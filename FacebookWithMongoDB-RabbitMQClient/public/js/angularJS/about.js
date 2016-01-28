var app = angular.module('about', []);

app.controller('c-about', [ '$scope', '$http', '$location',
		function($scope, $http) {
			$scope.c_relationship = false;
			$scope.c_contact_info = false;
			$scope.c_work_education = false;
			$scope.c_life_events = true;
			$scope.c_interests = false;

			$scope.cOverview = function() {
				$scope.c_relationship = false;
				$scope.c_contact_info = false;
				$scope.c_work_education = false;
				$scope.c_interests = false;
				$scope.c_life_events = true;

			};

			$scope.cLifeEvents = function() {
				$scope.c_life_events = false;
				$scope.c_relationship = true;
				$scope.c_contact_info = true;
				$scope.c_work_education = true;
				$scope.c_interests = true;
			};

			$scope.cRelation = function() {
				$scope.c_life_events = true;
				$scope.c_relationship = false;
				$scope.c_contact_info = true;
				$scope.c_work_education = true;
				$scope.c_interests = true;
			};

			$scope.cWork = function() {
				$scope.c_life_events = true;
				$scope.c_relationship = true;
				$scope.c_contact_info = true;
				$scope.c_work_education = false;
				$scope.c_interests = true;
			};

			$scope.cContact = function() {
				$scope.c_life_events = true;
				$scope.c_relationship = true;
				$scope.c_contact_info = false;
				$scope.c_work_education = true;
				$scope.c_interests = true;
			};

			$scope.cInterests = function() {
				$scope.c_life_events = true;
				$scope.c_relationship = true;
				$scope.c_contact_info = true;
				$scope.c_work_education = true;
				$scope.c_interests = false;
			};

			$scope.aboutinfo = function() {
				$http({
					method : "GET",
					url : '/aboutM',
				}).success(function(data) {
					if (data.status == 200) {
						console.log("success");
						var aboutInfo = data.data;

						$scope.music = aboutInfo.music;
						$scope.shows = aboutInfo.shows;
						$scope.sports = aboutInfo.sports;
						$scope.city = aboutInfo.city;
						$scope.country = aboutInfo.country;
						$scope.phoneNumber = aboutInfo.phoneNumber;
						$scope.relationship = aboutInfo.relationship;
						$scope.emailId = aboutInfo.emailId;
						$scope.dateOfBirth = aboutInfo.dateOfBirth;
						$scope.companyName = aboutInfo.companyName;
						$scope.position = aboutInfo.position;
						$scope.schoolName = aboutInfo.schoolName;
						$scope.major = aboutInfo.major;

					} else {

					}
				}).error(function(error) {
					console.log("error");
				});
			};

			$scope.aboutinfo();
		} ]);