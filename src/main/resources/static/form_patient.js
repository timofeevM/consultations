var app = angular.module("consultations", []);
app.controller("consultationsController", function ($scope, $http) {

    $scope.typeSearch = "Фио";

    $scope.patients = [];

    $scope.consultations = [];

    $scope.createModalShown = false;

    $scope.editModalShown = false;

    $scope.openModalShown = false;

    $scope.createConsultationModalShown = false;

    $scope.editConsultationModalShown = false;

    $scope.disabledPatientButtons = true;

    $scope.disabledConsultationButtons = true;

    let selectedPatient = null;

    let selectedConsultation = null;

    $http.get('http://localhost:8080/getAllPatients').then(function (patients) {
        $scope.patients = patients.data;
    });

    $scope.mySearch = function(patient){
        if ($scope.searchText==null||$scope.searchText===""){
            return true;
        }else {
            let searchRegx = new RegExp("^"+$scope.searchText, "i");
            if($scope.typeSearch==="Фио") {
                return searchRegx.test(patient.name)||searchRegx.test(patient.lastName)||searchRegx.test(patient.middleName);
            }else if ($scope.typeSearch==="Снилс") {
                return searchRegx.test(patient.socialSecurityNumber);
            }else {
                return false;
            }
        }
    };

    $scope.deleteConfirmPatient = function(){
      if (confirm("Вы действительно хотите удалить пациента?")){
          $scope.deletePatient();
      }
    };

    $scope.deleteConfirmConsultation = function(){
        if (confirm("Вы действительно хотите удалить консультацию?")){
            $scope.deleteConsultation();
        }
    };

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

    $scope.editConsultation = function (consultationEditDate,consultationEditTime,consultationEditSymptoms) {
        if (isValidConsultation(consultationEditDate,consultationEditTime,consultationEditSymptoms)) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/editConsultation',
                headers: {'Content-Type': 'application/json'},
                data: ({
                    'id':selectedConsultation,
                    'date': consultationEditDate,
                    'time': consultationEditTime.valueOf(),
                    'symptoms': consultationEditSymptoms,
                    'patient': {
                        'id': selectedPatient
                    }
                })

            }).then(function (result) {
                if (result.data === true) {
                    $http.get('http://localhost:8080/getConsultations?id=' + selectedPatient).then(function (consultations) {
                        $scope.consultations = consultations.data;
                    });
                    $scope.disabledConsultationButtons = true;
                    selectedConsultation = null;
                    $scope.editConsultationModalShown = false;
                    alert("Консультация изменена")
                } else {
                    alert("Форма заполнена не корректно");
                }
            });
        }else {
            alert("Форма заполнена не корректно")
        }
    };

    $scope.createConsultation = function (consultationDate, consultationTime, consultationSymptoms) {
        if (isValidConsultation(consultationDate, consultationTime, consultationSymptoms)) {
            $http({
                method: 'POST',
                url: 'http://localhost:8080/addConsultation',
                headers: {'Content-Type': 'application/json'},
                data: ({
                    'date': consultationDate,
                    'time': consultationTime.valueOf(),
                    'symptoms': consultationSymptoms,
                    'patient': {
                        'id': selectedPatient
                    }
                })

            }).then(function (result) {
                if (result.data === true) {
                    $http.get('http://localhost:8080/getConsultations?id=' + selectedPatient).then(function (consultations) {
                        $scope.consultations = consultations.data;
                    });
                    $scope.createConsultationModalShown = false;
                    alert("Консультация добавлена")
                } else {
                    alert("Форма заполнена не корректно");
                }
            });
        }else {
            alert("Форма заполнена не корректно")
        }
    };

    $scope.deletePatient = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/deletePatient',
            headers: {'Content-Type': 'application/json'},
            data: ({
                'id': selectedPatient
            })
        }).then(function (result) {
            if (result.data === true) {
                window.location.reload(true);
                alert("Пациент успешно удален");
                document.getElementById(selectedPatient).classList.remove('selected_patient');
                $scope.disabledPatientButtons = true;
                selectedPatient = null;
            } else {
                alert("Произошла ошибка, пациент не удален");
            }
        });
    };

    $scope.deleteConsultation = function () {
        $http({
            method: 'POST',
            url: 'http://localhost:8080/deleteConsultation',
            headers: {'Content-Type': 'application/json'},
            data: ({
                'id': selectedConsultation
            })
        }).then(function (result) {
            if (result.data === true) {
                $http.get('http://localhost:8080/getConsultations?id=' + selectedPatient).then(function (consultations) {
                    $scope.consultations = consultations.data;
                });
                alert("Консультация успешно удалена");
                document.getElementById(selectedConsultation).classList.remove('selected_patient');
                $scope.disabledConsultationButtons = true;
                selectedConsultation = null;
            } else {
                alert("Произошла ошибка, консультация не удалена");
            }
        });
    };

    $scope.editModal = function () {
        $scope.editModalShown = !$scope.editModalShown;
        $http.get('http://localhost:8080/getPatient?id=' + selectedPatient).then(function (patient) {
            if (patient!=null){
                $scope.editName = patient.data.name;
                $scope.editLastName = patient.data.lastName;
                $scope.editMiddleName = patient.data.middleName;
                $scope.editDate = new Date(patient.data.dateOfBirth);
                $scope.editGender = patient.data.gender;
                $scope.editSocialSecurityNumber = patient.data.socialSecurityNumber;
            }else {
                alert("Пациент не найден");
                $scope.editModalShown = false;
            }

        });
    };

    $scope.editConsultationModal = function () {
        $scope.editConsultationModalShown = !$scope.editConsultationModalShown;
        $http.get('http://localhost:8080/getConsultation?id=' + selectedConsultation).then(function (consultation) {
            if (consultation!=null){
                $scope.consultationEditDate = new Date(consultation.data.date);
                $scope.consultationEditTime = new Date("1970-01-01T"+consultation.data.time);
                $scope.consultationEditSymptoms = consultation.data.symptoms;
            }else {
                alert("Консультация не найдена");
                $scope.editConsultationModalShown = false;
            }
        });
    };

    $scope.openModal = function () {
        $scope.openModalShown = !$scope.openModalShown;
        $scope.disabledConsultationButtons = true;
        selectedConsultation = null;
        $http.get('http://localhost:8080/getPatient?id=' + selectedPatient).then(function (patient) {
            if (patient!=null){
                $scope.openId = patient.data.id;
                $scope.openName = patient.data.name;
                $scope.openLastName = patient.data.lastName;
                $scope.openMiddleName = patient.data.middleName;
                $scope.openDate = patient.data.dateOfBirth;
                $scope.openGender = patient.data.gender;
                $scope.openSocialSecurityNumber = patient.data.socialSecurityNumber;
                $http.get('http://localhost:8080/getConsultations?id=' + selectedPatient).then(function (consultations) {
                    $scope.consultations = consultations.data;
                });
            }else {
                alert("Пациент не найден");
                $scope.openModalShown = false;
            }
        });
    };

    $scope.createModal = function () {
        $scope.createModalShown = !$scope.createModalShown;
    };

    $scope.createConsultationModal = function () {
        $scope.createConsultationModalShown = !$scope.createConsultationModalShown;
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

    $scope.clickConsultation = function (id) {
        if (selectedConsultation != null) {
            document.getElementById(selectedConsultation).classList.remove('selected_patient');
        }
        if (id === selectedConsultation) {
            document.getElementById(selectedConsultation).classList.remove('selected_patient');
            $scope.disabledConsultationButtons = true;
            selectedConsultation = null;
        } else {
            selectedConsultation = id;
            document.getElementById(id).classList.add('selected_patient');
            $scope.disabledConsultationButtons = false;
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

    let isValidConsultation = function (consultationDate, consultationTime, consultationSymptoms) {
        if (consultationDate !== null) {
            if (consultationTime !== null) {
                return true;
            } else {
                alert("Введено не корректное время");
            }
        } else {
            alert("Введена не корректная дата")
        }
    }

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