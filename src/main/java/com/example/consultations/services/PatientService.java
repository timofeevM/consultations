package com.example.consultations.services;

import com.example.consultations.entity.Patient;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PatientService {
    List<Patient> getAllPatients();
}
