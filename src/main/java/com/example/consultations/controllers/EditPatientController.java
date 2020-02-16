package com.example.consultations.controllers;

import com.example.consultations.entity.Patient;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class EditPatientController {
    @Autowired
    PatientService patientService;

    @GetMapping("/editPatient")
    public Patient getEditPatientController(Long id){
        return patientService.getPatientById(id);
    }

    @PostMapping("/editPatient")
    public Boolean addPatientController(@RequestBody Patient editPatient) {
        if (editPatient.validPatient()){
            patientService.savePatient(editPatient);
            return true;
        }else {
            return false;
        }
    }
}
