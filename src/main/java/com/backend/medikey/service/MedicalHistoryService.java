package com.backend.medikey.service;

import com.backend.medikey.dto.MedicalHistoryDto;
import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Patient;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MedicalHistoryService {

    List<MedicalHistoryDto> getAllMedicalHistories();
    List<MedicalHistoryDto> getMedicalHistoryByPatientId(Long patientId);

    MedicalHistoryDto addMedicalHistory(MedicalHistoryDto medicalHistoryDto);

    MedicalHistoryDto updateMedicalHistory(MedicalHistoryDto medicalHistoryDto);

    void deleteMedicalHistory(Long id);

}
