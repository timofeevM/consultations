package com.example.consultations.controllers;

import com.example.consultations.entity.Consultation;
import com.example.consultations.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EditConsultationController {
    @Autowired
    ConsultationService consultationService;

    @PostMapping("/editConsultation")
    public Boolean editPatientController(@RequestBody Consultation consultation) {
        if (consultation.validConsultation()) {
            return consultationService.edit(consultation);
        } else {
            return false;
        }
    }
}
