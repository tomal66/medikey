package com.backend.medikey.controller;

import com.backend.medikey.dto.MedicationDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.Visit;
import com.backend.medikey.service.MedicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medications")
public class MedicationController {

    @Autowired
    private MedicationService medicationService;

    // Convert entity to DTO
    private MedicationDto convertToDto(Medication medication) {
        MedicationDto dto = new MedicationDto();
        dto.setMedicationId(medication.getMedicationId());
        dto.setPatientId(medication.getPatient().getPatientId());
        dto.setPrescribedById(medication.getPrescribedBy().getDoctorId());
        dto.setVisitId(medication.getVisit().getVisitId());
        dto.setDatePrescribed(medication.getDatePrescribed());
        dto.setMedicationName(medication.getMedicationName());
        dto.setDosage(medication.getDosage());
        dto.setFrequency(medication.getFrequency());
        dto.setDuration(medication.getDuration());
        dto.setStatus(medication.getStatus());
        dto.setSideEffects(medication.getSideEffects());
        dto.setNotes(medication.getNotes());
        return dto;
    }

    // Convert DTO to entity
    private Medication convertToEntity(MedicationDto dto) {
        Medication medication = new Medication();
        // Note: You should fetch the related entities (Patient, Doctor, Visit) here
        medication.setMedicationId(dto.getMedicationId());
        medication.setPatient(new Patient(dto.getPatientId()));
        //medication.setPrescribedBy(new Doctor(dto.getPrescribedById()));
        //medication.setVisit(new Visit(dto.getVisitId()));
        medication.setDatePrescribed(dto.getDatePrescribed());
        medication.setMedicationName(dto.getMedicationName());
        medication.setDosage(dto.getDosage());
        medication.setFrequency(dto.getFrequency());
        medication.setDuration(dto.getDuration());
        medication.setStatus(dto.getStatus());
        medication.setSideEffects(dto.getSideEffects());
        medication.setNotes(dto.getNotes());
        return medication;
    }

    @GetMapping
    public ResponseEntity<List<MedicationDto>> getAllMedications() {
        List<Medication> medications = medicationService.getAllMedications();
        List<MedicationDto> medicationDtos = medications.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(medicationDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationDto> getMedicationById(@PathVariable Long id) {
        Optional<Medication> medication = medicationService.getMedicationById(id);
        return medication.map(value -> new ResponseEntity<>(convertToDto(value), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<MedicationDto> addMedication(@RequestBody MedicationDto medicationDto) {
        Medication medication = convertToEntity(medicationDto);
        Medication savedMedication = medicationService.addMedication(medication);
        return new ResponseEntity<>(convertToDto(savedMedication), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationDto> updateMedication(@PathVariable Long id, @RequestBody MedicationDto medicationDto) {
        if (!id.equals(medicationDto.getMedicationId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Medication medication = convertToEntity(medicationDto);
        Medication updatedMedication = medicationService.updateMedication(medication);
        return new ResponseEntity<>(convertToDto(updatedMedication), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}