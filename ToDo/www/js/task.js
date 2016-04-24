angular.module('task', ['ionic','database'])

.controller('taskCtrl', function($scope, SQLService) {
  
  //calls function which creates database
	SQLService.setup();
		//loads tasks from database
	$scope.loadTask = function() {
		SQLService.all().then(function (results) {
			$scope.tasks = results;
		});	
	}

	$scope.loadTask(); 
  
  $scope.createTask = function(task) {
	 //adds task to database then reloads database info
	SQLService.set(task.title);
	$scope.loadTask();
	//sets input back to empty,null
    task.title = "";
  };
})