package com.backend.medikey.service;

import com.backend.medikey.model.MedicalHistory;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MedicalHistoryService {

    List<MedicalHistory> getAllMedicalHistories();

    List<MedicalHistory> getMedicalHistoryById(Long id);

    List<MedicalHistory> getMedicalHistoriesByUserId(Long userId);

    List<MedicalHistory> getMedicalHistoriesByDiagnosis(String diagnosis);

    List<MedicalHistory> getMedicalHistoriesByDateRecorded(Date dateRecorded);

    List<MedicalHistory> getMedicalHistoriesByRecordedBy(String recordedBy);

    MedicalHistory addMedicalHistory(MedicalHistory medicalHistory);

    MedicalHistory updateMedicalHistory(MedicalHistory medicalHistory);

    void deleteMedicalHistory(Long id);

    // ... any other methods you want to declare
}
