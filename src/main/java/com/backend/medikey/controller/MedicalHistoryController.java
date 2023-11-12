package com.backend.medikey.controller;

import com.backend.medikey.dto.MedicalHistoryDto;
import com.backend.medikey.service.MedicalHistoryService;
import com.backend.medikey.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicalHistories")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;
    @Autowired
    private VisitService visitService;
    // Get all medical histories
    @GetMapping
    public ResponseEntity<List<MedicalHistoryDto>> getAllMedicalHistories() {
        List<MedicalHistoryDto> medicalHistories = medicalHistoryService.getAllMedicalHistories();
        return new ResponseEntity<>(medicalHistories, HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<MedicalHistoryDto> getById(@PathVariable Long id) {
        MedicalHistoryDto dto = medicalHistoryService.getById(id);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }


    // Get a specific medical history by patient ID
    @GetMapping("/{patientId}")
    public ResponseEntity<List<MedicalHistoryDto>> getMedicalHistoriesByPatientId(@PathVariable Long patientId) {
        List<MedicalHistoryDto> medicalHistories = medicalHistoryService.getMedicalHistoryByPatientId(patientId);
        if (!medicalHistories.isEmpty()) {
            return new ResponseEntity<>(medicalHistories, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Add a new medical history
    @PostMapping
    public ResponseEntity<MedicalHistoryDto> addMedicalHistory(@RequestBody MedicalHistoryDto medicalHistoryDto) {
        MedicalHistoryDto newMedicalHistory = medicalHistoryService.addMedicalHistory(medicalHistoryDto);
        visitService.linkMedicalHistory(newMedicalHistory.getMedicalHistoryId(), medicalHistoryDto.getVisitId());
        return new ResponseEntity<>(newMedicalHistory, HttpStatus.CREATED);
    }

    // Update an existing medical history
    @PutMapping("/{id}")
    public ResponseEntity<MedicalHistoryDto> updateMedicalHistory(@PathVariable Long id, @RequestBody MedicalHistoryDto medicalHistoryDto) {
        if (!id.equals(medicalHistoryDto.getMedicalHistoryId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        MedicalHistoryDto updatedMedicalHistory = medicalHistoryService.updateMedicalHistory(medicalHistoryDto);
        return new ResponseEntity<>(updatedMedicalHistory, HttpStatus.OK);
    }

    // Delete a medical history by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        medicalHistoryService.deleteMedicalHistory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
