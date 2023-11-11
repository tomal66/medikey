package com.backend.medikey.service;

import com.backend.medikey.dto.MedicalProfessionalDto;
import com.backend.medikey.model.MedicalProfessional;

import java.util.List;
import java.util.Optional;

public interface MedicalProfessionalService {

    MedicalProfessionalDto save(MedicalProfessionalDto medicalProfessionalDto);
    MedicalProfessionalDto findById(Long id);
    MedicalProfessionalDto findByUserId(Long id);
    List<MedicalProfessionalDto> findAll();
    MedicalProfessionalDto update(MedicalProfessionalDto medicalProfessionalDto);
    List<MedicalProfessionalDto> findByHospital(Long hospitalId);
    void delete(Long id);
}