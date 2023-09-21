package com.backend.medikey.service;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.repository.MedicalHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MedicalHistoryServiceImpl implements MedicalHistoryService {

    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Override
    public List<MedicalHistory> getAllMedicalHistories() {
        return medicalHistoryRepository.findAll();
    }

    @Override
    public Optional<MedicalHistory> getMedicalHistoryById(Long id) {
        return medicalHistoryRepository.findById(id);
    }

    @Override
    public List<MedicalHistory> getMedicalHistoriesByUserId(Long userId) {
        return medicalHistoryRepository.findByUser_UserId(userId);
    }
    @Override
    public List<MedicalHistory> getMedicalHistoriesByDiagnosis(String diagnosis) {
        return medicalHistoryRepository.findByDiagnosisContainingIgnoreCase(diagnosis);
    }

    @Override
    public List<MedicalHistory> getMedicalHistoriesByDateRecorded(Date dateRecorded) {
        return medicalHistoryRepository.findByDateRecorded(dateRecorded);
    }

    @Override
    public List<MedicalHistory> getMedicalHistoriesByRecordedBy(String recordedBy) {
        return medicalHistoryRepository.findByRecordedBy(recordedBy);
    }

    @Override
    public MedicalHistory addMedicalHistory(MedicalHistory medicalHistory) {
        return medicalHistoryRepository.save(medicalHistory);
    }

    @Override
    public MedicalHistory updateMedicalHistory(MedicalHistory medicalHistory) {
        return medicalHistoryRepository.save(medicalHistory);
    }

    @Override
    public void deleteMedicalHistory(Long id) {
        medicalHistoryRepository.deleteById(id);
    }


}