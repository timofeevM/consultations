var app = angular.module("consultations", []);
app.controller("consultationsController", function ($scope, $http) {
    $scope.patients=[];
    $http.get('http://localhost:8080/getAllPatients').then(function (patients) {
        $scope.patients=patients.data;
    });

    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };

    let isValidSsn = function (ssn) {
        let checkSum = parseInt(ssn.slice(9), 10);
        let sum = (ssn[0] * 9 + ssn[1] * 8 + ssn[2] * 7 + ssn[3] * 6 + ssn[4] * 5
            + ssn[5] * 4 + ssn[6] * 3 + ssn[7] * 2 + ssn[8] * 1);
        if(sum < 100 && sum === checkSum){
            return true;
        }else if((sum === 100 || sum === 101) && checkSum === 0){
            return true;
        }else if(sum > 101 && (sum%101 === checkSum || (sum%101 === 100 && checkSum === 0))){
            return true;
        }else{
            return false;
        }
    };

    $scope.createPatient = function (name,lastName,middleName,date,gender,socialSecurityNumber) {
        if (/^[А-Я][а-я]+$/.test(name)){
            if (/^[А-Я][а-я]+$/.test(lastName)){
                if (/^[А-Я][а-я]+$/.test(middleName)||middleName==null||middleName===""){
                    let todayDate = new Date();
                    if (todayDate-date>0&&date!=null) {
                        if (gender!=null) {
                            if (/^[0-9]{11}$/.test(socialSecurityNumber) && isValidSsn(socialSecurityNumber)) {
                                $http({
                                    method: 'POST',
                                    url: 'http://localhost:8080/addPatient',
                                    headers: {'Content-Type': 'application/json'},
                                    data: ({
                                        'name': name,
                                        'lastName': lastName,
                                        'middleName': middleName,
                                        'dateOfBirth': date,
                                        'gender': gender,
                                        'socialSecurityNumber': socialSecurityNumber
                                    })

                                }).then(function (result) {
                                    if (result.data === true) {
                                        $scope.divSuccess = true;
                                        $scope.divError = false;
                                        $http.get('http://localhost:8080/getAllPatients').then(function (patients) {
                                            $scope.patients=patients.data;
                                        });
                                    } else {
                                        $scope.divError = true;
                                        $scope.inpName = "Форма заполнена не корректно";
                                        $scope.divSuccess = false;
                                    }
                                });
                            } else {
                                $scope.divError = true;
                                $scope.inpName = "Поле СНИЛС заполнено не корректно";
                                $scope.divSuccess = false;
                            }
                        }else {
                            $scope.divError=true;
                            $scope.inpName="Поле Пол заполнено не корректно";
                            $scope.divSuccess=false;
                        }
                    }else {
                        $scope.divError=true;
                        $scope.inpName="Поле Дата рождения заполнено не корректно";
                        $scope.divSuccess=false;
                    }
                }else {
                    $scope.divError=true;
                    $scope.inpName="Поле Отчество заполнено не корректно";
                    $scope.divSuccess=false;
                }
            }else {
                $scope.divError=true;
                $scope.inpName="Поле Фамилия заполнено не корректно";
                $scope.divSuccess=false;
            }
        }else {
            $scope.divError=true;
            $scope.inpName="Поле Имя заполнено не корректно";
            $scope.divSuccess=false;
        }
    };
});

app.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true,
        transclude: true,
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};

            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }

            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }

            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: '<div class=\'ng-modal\' ng-show=\'show\'>\n' +
            '    <div class=\'ng-modal-overlay\' ng-click=\'hideModal()\'></div>\n' +
            '        <div class=\'ng-modal-dialog\' ng-style=\'dialogStyle\'>\n' +
            '        <div class=\'ng-modal-close\' ng-click=\'hideModal()\'>X</div>\n' +
            '        <div class=\'ng-modal-dialog-content\' ng-transclude></div>\n' +
            '    </div>\n' +
            '</div>'
    };
});