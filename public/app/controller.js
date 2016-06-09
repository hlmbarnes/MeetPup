angular.module('PupsCtrls', ['PupsServices'])
.controller('HomeCtrl', ['$scope', 'Pup', function($scope, Pup) {
  $scope.pups = [];

  Pup.query(function success(data) {
    $scope.pups = data.data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deletePup = function(id, pupsIdx) {
    Pup.delete({id: id}, function success(data) {
      $scope.pups.splice(pupsIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])

// controller to show all pups to be matched
.controller('ShowCtrl', ['$scope', '$stateParams', 'Pup', function($scope, $stateParams, Pup) {
  $scope.pups = [];
  $scope.matches = [];

  Pup.query(function success(data) {
    $scope.pups = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.hidePup = function(index) { 
  var pupNo = $scope.pups.splice(index, 1);  
  var hidden = pupNo.toString();
  // $scope.pups.pop();
}

  $scope.matchPup = function(index) { 
  
  var pupYes = $scope.pups.splice(index, 1);  
  var match = pupYes.toString();
  $scope.pups.push(matches);
}
}])
.controller('NewCtrl', ['$scope', '$location', 'Pup', function($scope, $location, Pup) {
  $scope.pup = {
    title: '',
    description: '',
    image: ''
  };

  $scope.createPup = function() {
    Pup.save($scope.pup, function success(data) {
      $location.path('/pups');
    }, function error(data) {
      console.log(data);

    });
  }
}])
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  }
}])

.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/pups/new');
    }, function error(res) {
      console.log(res);
    });
  }
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      console.log(res);
      Auth.saveToken(res.data.token);
      console.log('Token:', res.data.token)
      $location.path('/pups');
    }, function error(res) {
      console.log(res);
    });
  }
}])

.controller('MyPupCtrl', ['$scope', '$http', '$location', 'Auth', 'Pup', 
  function($scope, $http, $location, Auth, Pup){
    $scope.pup = {};

  Pup.get({id: $stateParams.id}, function success(data) {
    $scope.pup = data;
  }, function error(data) {
    console.log(data);
  });
}]) 


// .controller('MatchCtrl', ['$scope', '$http', 'Auth', function($scope, $http, auth){
//   $scope.user = {};
//   $scope.match = function(){

//   }
// }])



