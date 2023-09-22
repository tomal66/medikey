package com.backend.medikey.service;

import com.backend.medikey.model.Medication;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MedicationService {

    List<Medication> getAllMedications();

    Optional<Medication> getMedicationById(Long id);

    List<Medication> getMedicationsByUserId(Long userId);

    List<Medication> getMedicationsByDatePrescribed(Date datePrescribed);

    Medication addMedication(Medication medication);

    Medication updateMedication(Medication medication);

    void deleteMedication(Long id);
}
