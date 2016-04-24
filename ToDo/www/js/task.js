angular.module('task', ['ionic','database'])

.controller('taskCtrl', function($scope, $ionicPopup, SQLService) {
  
  //calls function which creates database
	SQLService.setup();
		//loads tasks from database
	$scope.loadTask = function() {
		SQLService.all().then(function (results) {
			$scope.tasks = results;
		});	
	}

	$scope.loadTask(); 
	$scope.listCanSwipe = true;
  
  $scope.createTask = function(task) {
	 //adds task to database then reloads database info
	SQLService.set(task.title);
	$scope.loadTask();
	//sets input back to empty,null
    task.title = "";
  };
  
  $scope.deleteItem = function(taskid) {
	  //popup which confirms deletion or not
	$ionicPopup.confirm({
	  title: 'Confirm Delete',
	  content: 'Deleting is permanent, are you sure?'
	}).then(function(res) {
	  if(res) {
		  //if "ok", then delete task with task id from from database
		  //then reload database info to update list
		SQLService.del(taskid);
		$scope.loadTask();
	  } 
	});
  };
  
  $scope.showDets = function(tasktitle) {
	   //popup.alert used to show alternative inerface for task info, rather than changing .html
	$ionicPopup.alert({
	  title: 'Task Info',
	  content: tasktitle
	})
  };
  
  $scope.edit = function(taskid,tasktitle) {
	 $ionicPopup.prompt({
	  title: 'Enter Updates to Task'
	}).then(function(res) {
		//if checks to see if they clicked ok option without entering characters, which would make it undefined or null
		if(res != "")
		{
			//deletes taskid saved task_name 
			SQLService.del(taskid);
			//sets new updated task_name
			SQLService.set(res);
			//loads database to refresh html page
			$scope.loadTask();
		}
	});
  };
})