var app = angular.module("consultations", []);
app.controller("consultationsController", function ($scope, $http) {
    $scope.patients=[];
    $http.get('http://localhost:8080/getAllPatients').then(function (patients) {
        $scope.patients=patients.data;
    });
});