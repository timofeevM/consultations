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
}
