package com.backend.medikey.controller;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/medical-history")
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @PostMapping("/create")
    public ResponseEntity<MedicalHistory> createMedicalHistory(@RequestBody MedicalHistory medicalHistory) {
        MedicalHistory newMedicalHistory = medicalHistoryService.save(medicalHistory);
        return new ResponseEntity<>(newMedicalHistory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistory> getMedicalHistoryById(@PathVariable Long id) {
        Optional<MedicalHistory> medicalHistory = medicalHistoryService.findById(id);
        return medicalHistory.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/all")
    public ResponseEntity<List<MedicalHistory>> getAllMedicalHistories() {
        List<MedicalHistory> medicalHistories = medicalHistoryService.getMedicalHistory();
        return new ResponseEntity<>(medicalHistories, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        medicalHistoryService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

