package com.example.consultations.services.serviceImpl;

import com.example.consultations.dao.ConsultationDao;
import com.example.consultations.entity.Consultation;
import com.example.consultations.entity.Patient;
import com.example.consultations.services.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConsultationServiceImpl implements ConsultationService {
    @Autowired
    ConsultationDao consultationDao;

    @Override
    public List<Consultation> getConsultationsByPatient(Patient patient) {
        return consultationDao.getAllByPatient(patient);
    }

    @Override
    public void deleteAll(List<Consultation> consultations) {
        consultationDao.deleteAll(consultations);
    }

    @Override
    public void deleteConsultation(Consultation consultation) {
        consultationDao.delete(consultation);
    }

    @Override
    public Consultation getConsultationById(Long id) {
        return consultationDao.findById(id).orElse(null);
    }

    @Override
    public void save(Consultation consultation) {
        consultationDao.save(consultation);
    }

    @Override
    public boolean edit(Consultation consultation) {
        if (getConsultationById(consultation.getId()) != null) {
            save(consultation);
            return true;
        } else {
            return false;
        }
    }
}
