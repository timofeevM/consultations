package com.example.consultations.controllers;

import com.example.consultations.entity.Patient;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddPatientController {

    @Autowired
    PatientService patientService;

    @PostMapping("/addPatient")
    public Boolean addPatientController(@RequestBody Patient patient) {
        if (patient.validPatient()) {
            patientService.savePatient(patient);
            return true;
        } else {
            return false;
        }
    }
}
