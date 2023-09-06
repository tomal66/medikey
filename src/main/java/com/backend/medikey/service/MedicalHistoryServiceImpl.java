package com.backend.medikey.service;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.repository.MedicalHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class MedicalHistoryServiceImpl implements MedicalHistoryService {
    @Autowired
    //private final MedicalHistoryRepository medicalHistoryRepository;
    //private final MedicalHistory medicalHistory;

    @Override
    public MedicalHistory save(MedicalHistory medicalHistory) {
        return null;
    }

    @Override
    public Optional<MedicalHistory> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<MedicalHistory> getMedicalHistory() {
        return null;
        //This line showing error
    }

    @Override
    public void deleteById(Long id) {

    }
}
