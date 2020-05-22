package com.example.consultations.services;

import com.example.consultations.entity.Patient;

import java.sql.SQLException;
import java.util.List;

public interface PatientService {
    List<Patient> getAllPatients();

    void savePatient(Patient patient);

    Patient getPatientById(Long id);

    void deletePatient(Patient patient) throws SQLException;

    boolean edit(Patient patient);
}
