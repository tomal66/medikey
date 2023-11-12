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

    @GetMapping
    public ResponseEntity<List<MedicationDto>> getAllMedications() {
        List<MedicationDto> medicationDtos = medicationService.getAllMedications();
        return new ResponseEntity<>(medicationDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicationDto> getMedicationById(@PathVariable Long id) {
        MedicationDto medicationDto = medicationService.getMedicationById(id);
        if (medicationDto != null) {
            return new ResponseEntity<>(medicationDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<MedicationDto> addMedication(@RequestBody MedicationDto medicationDto) {
        MedicationDto savedMedicationDto = medicationService.addMedication(medicationDto);
        return new ResponseEntity<>(savedMedicationDto, HttpStatus.CREATED);
    }

    @PostMapping("/batch")
    public ResponseEntity<List<MedicationDto>> addMultipleMedications(@RequestBody List<MedicationDto> medicationDtos) {
        List<MedicationDto> savedMedicationDtos = medicationService.addMultipleMedications(medicationDtos);
        return new ResponseEntity<>(savedMedicationDtos, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicationDto> updateMedication(@PathVariable Long id, @RequestBody MedicationDto medicationDto) {
        if (!id.equals(medicationDto.getMedicationId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        MedicationDto updatedMedicationDto = medicationService.updateMedication(medicationDto);
        return new ResponseEntity<>(updatedMedicationDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}