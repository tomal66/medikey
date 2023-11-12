package com.backend.medikey.service;

import com.backend.medikey.dto.MedicationDto;
import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MedicationServiceImpl implements MedicationService {

    @Autowired
    private MedicationRepository medicationRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private VisitRepository visitRepository;

    @Override
    public List<MedicationDto> getAllMedications() {
        return medicationRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MedicationDto getMedicationById(Long id) {
        return convertToDto(medicationRepository.findByMedicationId(id));
    }

    @Override
    public List<MedicationDto> getMedicationsByUsername(String username) {
        return medicationRepository.findMedicationsByUsername(username).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MedicationDto> getMedicationsByDatePrescribed(Date datePrescribed) {
        return medicationRepository.findByDatePrescribed(datePrescribed).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MedicationDto addMedication(MedicationDto medicationDto) {
        Medication medication = convertToEntity(medicationDto);
        return convertToDto(medicationRepository.save(medication));
    }

    @Override
    public List<MedicationDto> addMultipleMedications(List<MedicationDto> medicationDtos) {
        List<Medication> medications = medicationDtos.stream()
                .map(this::convertToEntity)
                .collect(Collectors.toList());
        List<Medication> savedMedications = medicationRepository.saveAll(medications);
        return savedMedications.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public MedicationDto updateMedication(MedicationDto medicationDto) {
        Medication medication = convertToEntity(medicationDto);
        return convertToDto(medicationRepository.save(medication));
    }

    @Override
    public void deleteMedication(Long id) {
        medicationRepository.deleteById(id);
    }

    public Medication convertToEntity(MedicationDto medicationDto) {
        Medication medication = new Medication();

        if(medicationDto.getMedicationId()!=null) {
            medication.setMedicationId(medicationDto.getMedicationId());
        }

        medication.setPatient(patientRepository.findByPatientId(medicationDto.getPatientId()));
        medication.setPrescribedBy(doctorRepository.findByDoctorId(medicationDto.getPrescribedById()));
        medication.setVisit(visitRepository.findByVisitId(medicationDto.getVisitId()));
        medication.setDatePrescribed(medicationDto.getDatePrescribed());
        medication.setMedicationName(medicationDto.getMedicationName());
        medication.setDosage(medicationDto.getDosage());
        medication.setFrequency(medicationDto.getFrequency());
        medication.setDuration(medicationDto.getDuration());
        medication.setStatus(medicationDto.getStatus());

        return medication;
    }

    public MedicationDto convertToDto(Medication medication) {
        MedicationDto medicationDto = new MedicationDto();

        medicationDto.setMedicationId(medication.getMedicationId());
        medicationDto.setPatientId(medication.getPatient().getPatientId());
        medicationDto.setPrescribedById(medication.getPrescribedBy().getDoctorId());
        medicationDto.setVisitId(medication.getVisit().getVisitId());
        medicationDto.setDatePrescribed(medication.getDatePrescribed());
        medicationDto.setMedicationName(medication.getMedicationName());
        medicationDto.setDosage(medication.getDosage());
        medicationDto.setFrequency(medication.getFrequency());
        medicationDto.setDuration(medication.getDuration());
        medicationDto.setStatus(medication.getStatus());

        return medicationDto;
    }
}