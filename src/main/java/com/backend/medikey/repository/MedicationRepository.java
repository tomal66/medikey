package com.backend.medikey.repository;

import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {

    // Find all medications by a specific user
    List<Medication> findByPatient(Patient patient);

    // Find all medications prescribed on a specific date
    List<Medication> findByDatePrescribed(Date datePrescribed);

    // Custom query to find medications by a specific doctor or hospital
    @Query("SELECT m FROM Medication m WHERE m.prescribedBy = ?1")
    List<Medication> findByPrescribedBy(String prescribedBy);

    // Custom query to find medications based on side effects
    @Query("SELECT m FROM Medication m WHERE m.sideEffects LIKE %?1%")
    List<Medication> findBySideEffectsContaining(String sideEffect);
}
