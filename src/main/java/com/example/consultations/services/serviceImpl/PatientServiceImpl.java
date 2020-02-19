package com.example.consultations.services.serviceImpl;

import com.example.consultations.dao.PatientDao;
import com.example.consultations.entity.Patient;
import com.example.consultations.services.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    PatientDao patientDao;

    @Override
    public List<Patient> getAllPatients() {
        return patientDao.findAll();
    }

    @Override
    public void savePatient(Patient patient) {
        patientDao.save(patient);
    }

    @Override
    public Patient getPatientById(Long id) {
        return patientDao.findById(id).orElse(null);
    }

    @Override
    public void deletePatient(Patient patient) {
        patientDao.delete(patient);
    }

    @Override
    public boolean edit(Patient patient) {
        if (getPatientById(patient.getId()) != null) {
            savePatient(patient);
            return true;
        } else {
            return false;
        }
    }
}
