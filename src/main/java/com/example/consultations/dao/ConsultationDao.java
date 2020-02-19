package com.example.consultations.dao;

import com.example.consultations.entity.Consultation;
import com.example.consultations.entity.Patient;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ConsultationDao extends CrudRepository<Consultation,Long> {
    List<Consultation> getAllByPatient(Patient patient);
    Optional<Consultation> findById(Long id);
}
