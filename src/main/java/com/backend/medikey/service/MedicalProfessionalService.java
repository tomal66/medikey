package com.backend.medikey.service;

import com.backend.medikey.model.MedicalProfessional;

import java.util.List;
import java.util.Optional;

public interface MedicalProfessionalService {

    // Create
    MedicalProfessional save(MedicalProfessional medicalProfessional);

    // Read
    Optional<MedicalProfessional> findById(Long id);
    Optional<MedicalProfessional> findByEmail(String email);
    Optional<MedicalProfessional> findByPhone(String phone);
    List<MedicalProfessional> findAll();

    // Update
    MedicalProfessional update(Long id, MedicalProfessional medicalProfessional);

    // Delete
    boolean deleteById(Long id);

    void delete(Long id);
}