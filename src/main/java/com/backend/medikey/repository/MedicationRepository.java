package com.backend.medikey.repository;

import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import com.backend.medikey.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicationRepository extends JpaRepository<Medication, Long> {
    Medication findByMedicationId(Long medicationId);

    // Find all medications by a specific user
    List<Medication> findByPatient(Patient patient);

    List<Medication> findByVisit(Visit visit);

    // Find all medications prescribed on a specific date
    List<Medication> findByDatePrescribed(Date datePrescribed);

    // Custom query to find medications by a specific doctor or hospital
    @Query("SELECT m FROM Medication m WHERE m.prescribedBy = ?1")
    List<Medication> findByPrescribedBy(String prescribedBy);

    @Query("SELECT m FROM Medication m JOIN m.patient p JOIN p.user u WHERE u.username = :username")
    List<Medication> findMedicationsByUsername(@Param("username") String username);


}
