(function(window) {
	'use strict';

	/**
	 * main Module
	 *
	 * Description
	 */
	var myapp = angular.module('main', []);
	myapp.controller('MainController', ['$scope', '$location', '$window', function($scope, $location, $window) {
		$scope.text = '';
		var Storage = $window.localStorage;
		$scope.todos = Storage['mylist'] ? JSON.parse(Storage['mylist']) : [];
		// $scope.todos = [{
		// 	id: 1,
		// 	text: "read",
		// 	completed: false
		// }, {
		// 	id: 2,
		// 	text: "sleep",
		// 	completed: false
		// }, {
		// 	id: 3,
		// 	text: "music",
		// 	completed: false
		// }, {
		// 	id: 4,
		// 	text: "sport",
		// 	completed: true
		// }];

		function update() {
			Storage['mylist'] = JSON.stringify($scope.todos);
		}
		$scope.add = function() {
			if ($scope.text != '') {
				$scope.todos.push({
					id: Math.random(),
					text: $scope.text,
					completed: false
				})

			}
			$scope.text = '';
			update();


		};

		$scope.remove = function(id) {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].id === id) {
					$scope.todos.splice(i, 1);
					break;
				}

			}
			update();
		}

		$scope.clear = function() {
			var result = [];
			for (var i = 0; i < $scope.todos.length; i++) {
				if (!$scope.todos[i].completed) {
					result.push($scope.todos[i]);

				}

			}

			$scope.todos = result;
			update();

		}


		$scope.exit = function() {
			for (var i = 0; i < $scope.todos.length; i++) {
				if ($scope.todos[i].completed) {
					return true;
				}
			}
			return false;
		}

		$scope.editid = -1;
		$scope.edit = function(id) {
			for (var i = 0; i < $scope.todos.length; i++) {
				if (id === $scope.todos[i].id) {
					if (!$scope.todos[i].completed) {
						$scope.editid = id;
					}

				}
			}


		}

		$scope.save = function() {
			$scope.editid = -1;
		}

		var now = false;

		$scope.toggleAll = function() {
			for (var i = 0; i < $scope.todos.length; i++) {
				$scope.todos[i].completed = now;
			}
			// update();
			now = !now;
		}



		$scope.selector = {};


		$scope.$location = $location;
		$scope.$watch('$location.path()', function(newValue, oldValue, scope) {
			// console.log(newValue);
			switch (newValue) {
				case '/active':
					$scope.selector = {
						completed: false
					};

					break;
				case '/completed':
					$scope.selector = {
						completed: true
					};

					break;
				default:
					$scope.selector = {};

					break;

			}

		});



	}])
})(window);