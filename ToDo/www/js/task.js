angular.module('task', ['ionic','database'])

.controller('taskCtrl', function($scope, $ionicModal, $ionicPopup, SQLService) {
  
	SQLService.setup();
	$scope.loadTask = function() {
		SQLService.all().then(function (results) {
			$scope.tasks = results;
		});	
	}

	$scope.loadTask(); 
	$scope.listCanSwipe = true;
  
  $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
    $scope.taskModal = modal;
  }, {
    scope: $scope,
    animation: 'animated ' + 'slide-in-up'
  });
 
  $scope.newTask = function() {
    $scope.taskModal.show();
  };
  
  $scope.closeNewTask = function() {
    $scope.taskModal.hide();
  };
  
  $scope.createTask = function(task) {
	SQLService.set(task.title);
	$scope.loadTask();
	$scope.taskModal.hide();
    task.title = "";
  };
  
  $scope.deleteItem = function(taskid) {
	$ionicPopup.confirm({
	  title: 'Confirm Delete',
	  content: 'Deleting is permanent, are you sure?'
	}).then(function(res) {
	  if(res) {
		SQLService.del(taskid);
		$scope.loadTask();
	  } 
	});
  };
  
   $scope.showDets = function(tasktitle) {
	$ionicPopup.alert({
	  title: 'Task Info',
	  content: tasktitle
	})
  };
  
  $scope.edit = function(taskid,tasktitle) {
	 $ionicPopup.prompt({
	  title: 'Enter Updates to Task'
	}).then(function(res) {
		if(res != "")
		{
			SQLService.del(taskid);
			SQLService.set(res);
			$scope.loadTask();
		}
	});
  };
})