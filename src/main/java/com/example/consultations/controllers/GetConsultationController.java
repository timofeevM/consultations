package com.example.consultations.controllers;

import com.example.consultations.entity.Consultation;
import com.example.consultations.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GetConsultationController {
    @Autowired
    ConsultationService consultationService;

    @GetMapping("/getConsultation")
    public Consultation getConsultationController(Long id) {
        return consultationService.getConsultationById(id);
    }
}
