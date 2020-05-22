package com.example.consultations.controllers;

import com.example.consultations.entity.Patient;
import com.example.consultations.services.ConsultationService;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class DeletePatientController {
    @Autowired
    PatientService patientService;
    @Autowired
    ConsultationService consultationService;

    @PostMapping("/deletePatient")
    public Boolean deletePatientController(@RequestBody Patient patient) {
        Patient deletePatient = patientService.getPatientById(patient.getId());
        if (deletePatient != null) {
            consultationService.deleteAll(consultationService.getConsultationsByPatient(deletePatient));
            try{
                patientService.deletePatient(patient);
            }catch (SQLException e){
                return false;
            }
            return true;
        } else {
            return false;
        }
    }
}
