package com.example.consultations.controllers;

import com.example.consultations.entity.Patient;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DeletePatientController {
    @Autowired
    PatientService patientService;

    @PostMapping("/deletePatient")
    public Boolean deletePatientController(@RequestBody Patient patient) {
        patientService.deletePatient(patient);
        return true;
    }
}
