package com.backend.medikey.service;

import com.backend.medikey.model.Medication;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.MedicationRepository;
import com.backend.medikey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class MedicationServiceImpl implements MedicationService {

    @Autowired
    private MedicationRepository medicationRepository;
    private UserRepository userRepository;

    @Override
    public List<Medication> getAllMedications() {
        return medicationRepository.findAll();
    }

    @Override
    public Optional<Medication> getMedicationById(Long id) {
        return medicationRepository.findById(id);
    }

    @Override
    public List<Medication> getMedicationsByUserId(Long userId) {
        Optional<User> patient = userRepository.findUserByUserId(userId);
        return medicationRepository.findByPatient(patient);
    }

    @Override
    public List<Medication> getActiveMedicationsByUserId(Long userId, String status) {
        return medicationRepository.findByUser_UserIdAndStatus(userId, status);
    }

    @Override
    public List<Medication> getMedicationsByDatePrescribed(Date datePrescribed) {
        return medicationRepository.findByDatePrescribed(datePrescribed);
    }

    @Override
    public Medication addMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    @Override
    public Medication updateMedication(Medication medication) {
        return medicationRepository.save(medication);
    }

    @Override
    public void deleteMedication(Long id) {
        medicationRepository.deleteById(id);
    }

    // ... implement any other methods declared in the interface
}
