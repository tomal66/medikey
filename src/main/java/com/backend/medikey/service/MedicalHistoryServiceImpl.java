package com.backend.medikey.service;

import com.backend.medikey.dto.MedicalHistoryDto;
import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Patient;
import com.backend.medikey.repository.*;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicalHistoryServiceImpl implements MedicalHistoryService {


    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private VisitRepository visitRepository;
    @Autowired
    private MedicalProfessionalRepository medicalProfessionalRepository;

    private MedicalHistoryDto convertToDto(MedicalHistory medicalHistory) {
        MedicalHistoryDto dto = new MedicalHistoryDto();

        if (medicalHistory != null) {
            dto.setMedicalHistoryId(medicalHistory.getMedicalHistoryId());
            dto.setPatientId(medicalHistory.getPatient() != null ? medicalHistory.getPatient().getPatientId() : null);
            dto.setVisitId(medicalHistory.getVisit() != null ? medicalHistory.getVisit().getVisitId() : null);
            dto.setDiagnosis(medicalHistory.getDiagnosis());
            dto.setSymptoms(medicalHistory.getSymptoms());
            dto.setAllergies(medicalHistory.getAllergies());
            dto.setChronicDiseases(medicalHistory.getChronicDiseases());
            dto.setFamilyHistory(medicalHistory.getFamilyHistory());
            dto.setRecordedByMPId(medicalHistory.getRecordedBy() != null ? medicalHistory.getRecordedBy().getMpId() : null);
            dto.setNotes(medicalHistory.getNotes());
            dto.setImmunizations(medicalHistory.getImmunizations());
            dto.setPreviousSurgeries(medicalHistory.getPreviousSurgeries());
            dto.setHeight(medicalHistory.getHeight());
            dto.setWeight(medicalHistory.getWeight());
        }

        return dto;
    }

    private MedicalHistory convertToEntity(MedicalHistoryDto dto) {
        MedicalHistory medicalHistory = new MedicalHistory();

        if (dto != null) {
            medicalHistory.setMedicalHistoryId(dto.getMedicalHistoryId());
            medicalHistory.setPatient(patientRepository.findByPatientId(dto.getPatientId()));
            medicalHistory.setVisit(visitRepository.findByVisitId(dto.getVisitId()));
            medicalHistory.setDiagnosis(dto.getDiagnosis());
            medicalHistory.setSymptoms(dto.getSymptoms());
            medicalHistory.setAllergies(dto.getAllergies());
            medicalHistory.setChronicDiseases(dto.getChronicDiseases());
            medicalHistory.setFamilyHistory(dto.getFamilyHistory());
            medicalHistory.setRecordedBy(medicalProfessionalRepository.findByMpId(dto.getRecordedByMPId()));
            medicalHistory.setNotes(dto.getNotes());
            medicalHistory.setImmunizations(dto.getImmunizations());
            medicalHistory.setPreviousSurgeries(dto.getPreviousSurgeries());
            medicalHistory.setHeight(dto.getHeight());
            medicalHistory.setWeight(dto.getWeight());
        }

        return medicalHistory;
    }

    @Override
    public List<MedicalHistoryDto> getAllMedicalHistories() {
        List<MedicalHistory> medicalHistories = medicalHistoryRepository.findAll();
        return medicalHistories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicalHistoryDto> getMedicalHistoryByPatientId(Long patientId) {
        List<MedicalHistory> medicalHistories = medicalHistoryRepository.findByPatient_PatientId(patientId);
        return medicalHistories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MedicalHistoryDto getById(Long id) {
        return convertToDto(medicalHistoryRepository.findByMedicalHistoryId(id));
    }

    @Override
    public MedicalHistoryDto addMedicalHistory(MedicalHistoryDto medicalHistoryDto) {
        MedicalHistory medicalHistory = convertToEntity(medicalHistoryDto);
        medicalHistory = medicalHistoryRepository.save(medicalHistory);
        return convertToDto(medicalHistory);
    }


    @Override
    public MedicalHistoryDto updateMedicalHistory(MedicalHistoryDto medicalHistoryDto) {
        if (medicalHistoryDto.getMedicalHistoryId() == null || !medicalHistoryRepository.existsById(medicalHistoryDto.getMedicalHistoryId())) {
            throw new EntityNotFoundException("MedicalHistory not found");
        }
        MedicalHistory medicalHistory = convertToEntity(medicalHistoryDto);
        medicalHistory = medicalHistoryRepository.save(medicalHistory);
        return convertToDto(medicalHistory);
    }


    @Override
    public void deleteMedicalHistory(Long id) {
        if (!medicalHistoryRepository.existsById(id)) {
            throw new EntityNotFoundException("MedicalHistory not found");
        }
        medicalHistoryRepository.deleteById(id);
    }

}