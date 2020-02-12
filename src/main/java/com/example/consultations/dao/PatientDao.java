package com.example.consultations.dao;

import com.example.consultations.entity.Patient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientDao extends CrudRepository<Patient,Long> {
    List<Patient> findAll();
}
