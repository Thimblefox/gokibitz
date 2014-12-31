angular.module('gokibitz.controllers')
	.controller('LoginController', function ($rootScope, $scope, $modalInstance, Auth, $location) {
		$scope.error = {};
		$scope.user = {};

		$scope.login = function (form) {
			//console.log('login function wat');
			Auth.login('password', {
				'email': $scope.user.email,
				'password': $scope.user.password
			},
			function (err) {
				$scope.errors = {};

				if (!err) {
					//console.log('$scope', $scope);
					$rootScope.flash = {
						type: 'success',
						message: 'Welcome back, ' + $scope.currentUser.username + '!'
					};
					$modalInstance.close($scope.user);
				} else {
					angular.forEach(err.errors, function (error, field) {
						form[field].$setValidity('mongoose', false);
						$scope.errors[field] = error.type;
					});
					$scope.error.other = err.message;
				}
			});

		};

		$scope.cancel = function (callback) {
			$modalInstance.dismiss('cancel');

			console.log('firing callback...', callback);
			if (typeof callback === 'function') {
				callback();
			}
		};
	});