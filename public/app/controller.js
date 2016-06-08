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
.controller('ShowCtrl', ['$scope', '$stateParams', 'Pup', function($scope, $stateParams, Pup) {
  $scope.pup = {};

  Pup.get({id: $stateParams.id}, function success(data) {
    $scope.pup = data.data;
  }, function error(data) {
    console.log(data);
  });
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

// .controller('SignupCtrl', ['$scope', function($scope) {
//   $scope.user = {
//     email: '',
//     password: ''
//   };
//   $scope.userSignup = function() {
//     //to implement
//   }
// }])
// .controller('LoginCtrl', ['$scope', function($scope) {
//   $scope.user = {
//     email: '',
//     password: ''
//   };
//   $scope.userLogin = function() {
//     $http.post('api/pups');
//     // this is


//   }
// }])
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
    // $scope.pup = {};

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



