package com.example.consultations.controllers;

import com.example.consultations.entity.Consultation;
import com.example.consultations.services.ConsultationService;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AddConsultationController {
    @Autowired
    PatientService patientService;
    @Autowired
    ConsultationService consultationService;

    @GetMapping("/getConsultations")
    public List<Consultation> getConsultationsController(Long id) {
        return consultationService.getConsultationsByPatient(patientService.getPatientById(id));
    }

    @PostMapping("/addConsultation")
    public boolean addConsultationController(@RequestBody Consultation consultation) {
        if (consultation.validConsultation()) {
            consultationService.save(consultation);
            return true;
        } else {
            return false;
        }
    }
}
