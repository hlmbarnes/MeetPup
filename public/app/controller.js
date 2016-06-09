angular.module('PupsCtrls', ['PupsServices'])
.controller('HomeCtrl', ['$scope', 'Pup', function($scope, Pup) {
  $scope.pups = [];
  $scope.matches = [];

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
.controller('ShowCtrl', ['$scope', '$stateParams', 'Pup', '$http', 'Auth', function($scope, $stateParams, Pup, $http, Auth) {
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

  $scope.matchPup = function(pup) {
    $http.post(
      '/api/pups/match',
      {pup: pup, currentUserId: Auth.currentUser()._doc._id}
    )
    .then(
      function success(res) {
        console.log(res);
      },
      function error(res) {
        console.log(res);

      });
  }
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

.controller('MyPupCtrl', ['$scope', '$http', '$stateParams', '$location', 'Auth', 'Pup', 
  function($scope, $http, $stateParams, $location, Auth, Pup){
    $scope.pup = {};
    //console.log($stateParams.user.pup.id);

    $http.get('/api/users/pup').then(function success(res){
      $scope.pup = res.data;
      console.log("mypup", res);
    }, function error(res){
      console.log(res);
    });

  // Pup.get({id: $stateParams.user.pup.id}, function success(res) {
  //   $scope.pup = res.data;
  //   console.log("mypup", res);
  // }, function error(data) {
  //   console.log(data);
  //   });

     $scope.deletePup = function(id, pupsIdx) {
      Pup.delete({id: id}, function success(data) {
        $scope.pups.splice(pupsIdx, 1);
      }, function error(data) {
        console.log(data);
      });
      };
  }])

// match controller to pass the matches into the pup match array 
.controller('MatchCtrl', ['$scope', '$http', 'Auth', '$stateParams', 'Pup',
 function($scope, $http, Auth, $stateParams, Pup){
  $scope.user = {};
  $scope.match = function(){
    // Pup.get({id: $stateParams.user.pup.id}, function success(data) {
    //   $scope.pup = data;
    //   console.log(data);
    //   console.log(match);
    //   // $scope.save($scope.pup.match, function success(match){
    //   //   console.log(match);
    //   // })
    // });
    $http.get('/api/users/pup').then(function success(res){
      $scope.mypup = res.data;
    }, function error(res){
      console.log(res);
    });
  }
  $scope.match();
}])




