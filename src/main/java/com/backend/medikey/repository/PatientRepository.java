package com.backend.medikey.repository;

import com.backend.medikey.model.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    // Find by email
    Optional<Patient> findByEmail(String email);

    // Find by phone number
    Optional<Patient> findByPhone(String phone);

    // Find by user ID
    Optional<Patient> findByUserId(Long userId);
    Patient findByPatientId(Long patientId);

    // Find by hospital ID
    List<Patient> findByHospitalId(Long hospitalId);
}