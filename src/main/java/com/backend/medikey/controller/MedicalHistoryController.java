package com.backend.medikey.controller;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/medicalHistories")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    // Get all medical histories
    @GetMapping
    public ResponseEntity<List<MedicalHistory>> getAllMedicalHistories() {
        return new ResponseEntity<>(medicalHistoryService.getAllMedicalHistories(), HttpStatus.OK);
    }

    // Get a specific medical history by ID
    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistory> getMedicalHistoryById(@PathVariable Long id) {
        return medicalHistoryService.getMedicalHistoryById(id)
                .map(medicalHistory -> new ResponseEntity<>(medicalHistory, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get all medical histories for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MedicalHistory>> getMedicalHistoriesByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(medicalHistoryService.getMedicalHistoriesByUserId(userId), HttpStatus.OK);
    }

    // Get all medical histories with a specific diagnosis
    @GetMapping("/diagnosis/{diagnosis}")
    public ResponseEntity<List<MedicalHistory>> getMedicalHistoriesByDiagnosis(@PathVariable String diagnosis) {
        return new ResponseEntity<>(medicalHistoryService.getMedicalHistoriesByDiagnosis(diagnosis), HttpStatus.OK);
    }

    // Get all medical histories recorded on a specific date
    @GetMapping("/date/{dateRecorded}")
    public ResponseEntity<List<MedicalHistory>> getMedicalHistoriesByDateRecorded(@PathVariable Date dateRecorded) {
        return new ResponseEntity<>(medicalHistoryService.getMedicalHistoriesByDateRecorded(dateRecorded), HttpStatus.OK);
    }

    // Get all medical histories recorded by a specific person/doctor
    @GetMapping("/recordedBy/{recordedBy}")
    public ResponseEntity<List<MedicalHistory>> getMedicalHistoriesByRecordedBy(@PathVariable String recordedBy) {
        return new ResponseEntity<>(medicalHistoryService.getMedicalHistoriesByRecordedBy(recordedBy), HttpStatus.OK);
    }

    // Add a new medical history
    @PostMapping
    public ResponseEntity<MedicalHistory> addMedicalHistory(@RequestBody MedicalHistory medicalHistory) {
        return new ResponseEntity<>(medicalHistoryService.addMedicalHistory(medicalHistory), HttpStatus.CREATED);
    }

    // Update an existing medical history
    @PutMapping("/{id}")
    public ResponseEntity<MedicalHistory> updateMedicalHistory(@PathVariable Long id, @RequestBody MedicalHistory medicalHistory) {
        // Ensure the ID from the path matches the ID of the medical history object
        if (!id.equals(medicalHistory.getMedical_history_Id())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(medicalHistoryService.updateMedicalHistory(medicalHistory), HttpStatus.OK);
    }

    // Delete a medical history by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        medicalHistoryService.deleteMedicalHistory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
