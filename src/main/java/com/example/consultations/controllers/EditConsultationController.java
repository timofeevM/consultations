package com.example.consultations.controllers;

import com.example.consultations.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EditConsultationController {
    @Autowired
    ConsultationService consultationService;
}
