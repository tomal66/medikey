package com.backend.medikey.service;

import com.backend.medikey.model.MedicalHistory;

import java.util.List;
import java.util.Optional;

public interface MedicalHistoryService {
    MedicalHistory save(MedicalHistory medicalHistory);
    Optional<MedicalHistory> findById(Long id);
    List<MedicalHistory> getMedicalHistory();
    void deleteById(Long id);
}
