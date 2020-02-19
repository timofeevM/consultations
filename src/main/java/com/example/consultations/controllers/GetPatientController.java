package com.example.consultations.controllers;

import com.example.consultations.entity.Patient;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetPatientController {
    @Autowired
    PatientService patientService;

    @GetMapping("/getPatient")
    public Patient getPatientController(Long id) {
        return patientService.getPatientById(id);
    }
}
