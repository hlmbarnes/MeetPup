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
  };
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

// make http request upon ng-click (hide or play) that will hide the puppies  you click left and
// send http request to left or right and  left adds to the left, right will add to right. 

  $scope.hidePup = function(index) { 
  var pupNo = $scope.pups.splice(index, 1);  
  var hidden = pupNo.toString();
  console.log(pupNo)
  $scope.pups.pop();
  console.log($scope.pups);
  $scope.pups.push();
  }

  $scope.matchPup = function(index) { 
  var pupYes = $scope.pups.splice(index, 1);  
  var match = pupYes.toString();
  console.log(match.id);
  // $scope.pups.push(matches);
  $scope.pups.$save = new
  $http.post('/api/pups/match', $scope.pup).then(function success(res) {
    }, function error(res) {
      console.log(res);

    });
  // saves puppy info to user auth token
    $http.post('/api/users', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token)
      $location.path('/pups/new');
    }, function error(res) {
      console.log(res);

      });
    };
  }])

.controller('NewCtrl', ['$scope', '$location', 'Pup', 'Auth', function($scope, $location, Pup, Auth) {
  $scope.pup = {
    name: '',
    bio: '',
    image: ''
  };
  $scope.createPup = function() {
    Pup.save($scope.pup, function success(data) {
      $location.path('/pups');
    }, function error(data) {
      console.log(data);

    });
  };
}])

.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;
  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token:', Auth.getToken());
  };
}])

.controller('SignupCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location,Auth) {
  $scope.user = {
    email: '',
    password: ''
  };
  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token)
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
    console.log($stateParams.user.pup.id);
  Pup.get({id: $stateParams.user.pup.id}, function success(data) {
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



