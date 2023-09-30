package com.backend.medikey.service;

import com.backend.medikey.model.MedicalProfessional;
import com.backend.medikey.repository.MedicalProfessionalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalProfessionalServiceImpl implements MedicalProfessionalService {

    @Autowired
    private MedicalProfessionalRepository medicalProfessionalRepository;

    @Override
    public MedicalProfessional save(MedicalProfessional medicalProfessional) {
        return medicalProfessionalRepository.save(medicalProfessional);
    }

    @Override
    public Optional<MedicalProfessional> findById(Long id) {
        return medicalProfessionalRepository.findById(id);
    }

    @Override
    public Optional<MedicalProfessional> findByEmail(String email) {
        return medicalProfessionalRepository.findByEmail(email);
    }

    @Override
    public Optional<MedicalProfessional> findByPhone(String phone) {
        return medicalProfessionalRepository.findByPhone(phone);
    }

    @Override
    public List<MedicalProfessional> findAll() {
        return medicalProfessionalRepository.findAll();
    }

    @Override
    public MedicalProfessional update(Long id, MedicalProfessional medicalProfessional) {
        if (medicalProfessionalRepository.existsById(id)) {
            medicalProfessional.setMpId(id);
            return medicalProfessionalRepository.save(medicalProfessional);
        } else {
            // Handle the case where the MedicalProfessional does not exist
            return null;
        }
    }

    @Override
    public boolean deleteById(Long id) {
        if (medicalProfessionalRepository.existsById(id)) {
            medicalProfessionalRepository.deleteById(id);
        }
        // Optionally handle the case where the MedicalProfessional does not exist
        return false;
    }

    @Override
    public void delete(Long id) {
        medicalProfessionalRepository.deleteById(id);
    }
}