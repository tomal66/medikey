package com.backend.medikey.service;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.MedicalHistoryRepository;
import com.backend.medikey.repository.PatientRepository;
import com.backend.medikey.repository.UserRepository;
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

    @Autowired
    private PatientRepository patientRepository;
    private UserRepository userRepository;

    @Override
    public List<MedicalHistory> getAllMedicalHistories() {
        return medicalHistoryRepository.findAll();
    }

    @Override
    public List<MedicalHistory> getMedicalHistoryByPatientId(Long patientId) {
        return medicalHistoryRepository.findAllByPatientId(patientId);  // Replace with your actual repository method
    }

    @Override
    public List<MedicalHistory> getMedicalHistoriesByPatient(Patient patient) {
        return medicalHistoryRepository.findByPatient(patient);
    }
    @Override
    public List<MedicalHistory> getMedicalHistoriesByUserId(Long userId) {
        Patient patient = patientRepository.findByPatientId(userId);
            return medicalHistoryRepository.findByPatient(patient);
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