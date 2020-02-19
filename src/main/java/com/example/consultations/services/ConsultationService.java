package com.example.consultations.services;

import com.example.consultations.entity.Consultation;
import com.example.consultations.entity.Patient;

import java.util.List;

public interface ConsultationService {
    List<Consultation> getConsultationsByPatient(Patient patient);
    void deleteAll(List<Consultation> consultations);
    void deleteConsultation(Consultation consultation);
    Consultation getConsultationById(Long id);
    void save(Consultation consultation);
}
