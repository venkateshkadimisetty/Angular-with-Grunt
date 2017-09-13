app.controller('LoginCtrl',['$scope','$state',function($scope,$state) {
    $scope.isLogin=true;
    $scope.username="";
    $scope.password="";

    $scope.logInTab=function () {
        $scope.isLogin=true;
    };
    $scope.registerTab=function () {
        $scope.isLogin=false;
    };
    $scope.login=function () {
        if($scope.username=="admin" && $scope.password=="Password" ){
            $state.go("admin");
        }
    };

}]);