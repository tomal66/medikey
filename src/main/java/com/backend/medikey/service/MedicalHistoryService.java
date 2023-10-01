package com.backend.medikey.service;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Patient;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface MedicalHistoryService {

    List<MedicalHistory> getAllMedicalHistories();
    List<MedicalHistory> getMedicalHistoryByPatientId(Long patientId);


    //List<MedicalHistory> getMedicalHistoryById(Patient patient);
    List<MedicalHistory> getMedicalHistoriesByPatient(Patient patient);
    List<MedicalHistory> getMedicalHistoriesByUserId(Long userId);

    List<MedicalHistory> getMedicalHistoriesByDiagnosis(String diagnosis);

    List<MedicalHistory> getMedicalHistoriesByDateRecorded(Date dateRecorded);

    List<MedicalHistory> getMedicalHistoriesByRecordedBy(Long recordedById);

    MedicalHistory addMedicalHistory(MedicalHistory medicalHistory);

    MedicalHistory updateMedicalHistory(MedicalHistory medicalHistory);

    void deleteMedicalHistory(Long id);

    // ... any other methods you want to declare
}
