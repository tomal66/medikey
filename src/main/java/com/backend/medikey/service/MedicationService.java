package com.backend.medikey.service;

import com.backend.medikey.dto.MedicationDto;
import com.backend.medikey.model.Medication;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MedicationService {

    List<MedicationDto> getAllMedications();

    MedicationDto getMedicationById(Long id);

    //List<Medication> getMedicationsByUserId(Long userId);

    List<MedicationDto> getMedicationsByDatePrescribed(Date datePrescribed);

    MedicationDto addMedication(MedicationDto medicationDto);
    List<MedicationDto> addMultipleMedications(List<MedicationDto> medicationDtos);

    MedicationDto updateMedication(MedicationDto medicationDto);

    void deleteMedication(Long id);

    List<MedicationDto> getMedicationsByUsername(String username);
}
