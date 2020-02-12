package com.example.consultations.controllers;

import com.example.consultations.entity.Patient;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PatientController {
    @Autowired
    PatientService patientService;

    @GetMapping("/getAllPatients")
    public List<Patient> getAllPatientsController(){
        return patientService.getAllPatients();
    }
}
