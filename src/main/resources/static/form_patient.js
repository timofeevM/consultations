var app = angular.module("consultations", []);
app.controller("consultationsController", function ($scope, $http) {

    $scope.patients = [];

    $scope.createModalShown = false;

    $scope.modalEditShown = false;

    $scope.disabledPatientButtons = true;

    let selectedPatient = null;

    $http.get('http://localhost:8080/getAllPatients').then(function (patients) {
        $scope.patients = patients.data;
    });

    $scope.createPatient = function (name, lastName, middleName, date, gender, socialSecurityNumber) {
        if (isValidPatient(name, lastName, middleName, date, gender, socialSecurityNumber)) {
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
                    window.location.reload(true);
                    alert("Пациент успешно создан");
                    $http.get('http://localhost:8080/getAllPatients').then(function (patients) {
                        $scope.patients = patients.data;
                    });
                } else {
                    alert("Форма заполнена не корректно");
                }
            });
        }
    };

    $scope.editPatient = function (name, lastName, middleName, date, gender, socialSecurityNumber) {
        if (isValidPatient(name, lastName, middleName, date, gender, socialSecurityNumber)) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/editPatient',
                headers: {'Content-Type': 'application/json'},
                data: ({
                    'id': selectedPatient,
                    'name': name,
                    'lastName': lastName,
                    'middleName': middleName,
                    'dateOfBirth': date,
                    'gender': gender,
                    'socialSecurityNumber': socialSecurityNumber
                })
            }).then(function (result) {
                if (result.data === true) {
                    window.location.reload(true);
                    alert("Пациент успешно изменен");
                    document.getElementById(selectedPatient).classList.remove('selected_patient');
                    $scope.disabledPatientButtons = true;
                    selectedPatient = null;
                } else {
                    alert("Форма заполнена не корректно");
                }
            });
        }
    };

    $scope.editModal = function () {
        $scope.modalEditShown = !$scope.modalEditShown;
        $http.get('http://localhost:8080/editPatient?id=' + selectedPatient).then(function (patient) {
            $scope.editName = patient.data.name;
            $scope.editLastName = patient.data.lastName;
            $scope.editMiddleName = patient.data.middleName;
            $scope.editDate = new Date(patient.data.dateOfBirth);
            $scope.editGender = patient.data.gender;
            $scope.editSocialSecurityNumber = patient.data.socialSecurityNumber;
        });
    };

    $scope.createModal = function () {
        $scope.createModalShown = !$scope.createModalShown;
    };

    $scope.clickPatient = function (id) {
        if (selectedPatient != null) {
            document.getElementById(selectedPatient).classList.remove('selected_patient');
        }
        if (id === selectedPatient) {
            document.getElementById(selectedPatient).classList.remove('selected_patient');
            $scope.disabledPatientButtons = true;
            selectedPatient = null;
        } else {
            selectedPatient = id;
            document.getElementById(id).classList.add('selected_patient');
            $scope.disabledPatientButtons = false;
        }
    };

    let isValidSsn = function (ssn) {
        let checkSum = parseInt(ssn.slice(9), 10);
        let sum = (ssn[0] * 9 + ssn[1] * 8 + ssn[2] * 7 + ssn[3] * 6 + ssn[4] * 5
            + ssn[5] * 4 + ssn[6] * 3 + ssn[7] * 2 + ssn[8] * 1);
        if (sum < 100 && sum === checkSum) {
            return true;
        } else if ((sum === 100 || sum === 101) && checkSum === 0) {
            return true;
        } else if (sum > 101 && (sum % 101 === checkSum || (sum % 101 === 100 && checkSum === 0))) {
            return true;
        } else {
            return false;
        }
    };

    let isValidPatient = function (name, lastName, middleName, date, gender, socialSecurityNumber) {
        if (/^[А-Я][а-я]+$/.test(name)) {
            if (/^[А-Я][а-я]+$/.test(lastName)) {
                if (/^[А-Я][а-я]+$/.test(middleName) || middleName == null || middleName === "") {
                    let todayDate = new Date();
                    if (todayDate - date > 0 && date != null) {
                        if (gender != null) {
                            if (/^[0-9]{11}$/.test(socialSecurityNumber) && isValidSsn(socialSecurityNumber)) {
                                return true
                            } else {
                                alert("Поле СНИЛС заполнено не корректно");
                                return false;
                            }
                        } else {
                            alert("Поле Пол заполнено не корректно");
                            return false;
                        }
                    } else {
                        alert("Поле Дата рождения заполнено не корректно");
                        return false;
                    }
                } else {
                    alert("Поле Отчество заполнено не корректно");
                    return false;
                }
            } else {
                alert("Поле Фамилия заполнено не корректно");
                return false;
            }
        } else {
            alert("Поле Имя заполнено не корректно");
            return false;
        }
    };

});

app.directive('modalDialog', function () {
    return {
        restrict: 'E',
        scope: {
            show: "="
        },
        transclude: true,
        link: function (scope, element, attrs) {
            scope.dialogStyle = {};

            if (attrs.width) {
                scope.dialogStyle.width = attrs.width;
            }

            if (attrs.height) {
                scope.dialogStyle.height = attrs.height;
            }

            scope.hideModal = function () {
                scope.show = false;
            };
        },
        template: '<div class="ng-modal" ng-if="show">\n' +
            '    <div class="ng-modal-overlay" ng-click="hideModal()"></div>\n' +
            '        <div class="ng-modal-dialog" ng-style="dialogStyle">\n' +
            '        <div class="ng-modal-close" ng-click="hideModal()">X</div>\n' +
            '        <div class="ng-modal-dialog-content" ng-transclude></div>\n' +
            '    </div>\n' +
            '</div>'
    };
});