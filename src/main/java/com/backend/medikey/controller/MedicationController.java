package com.backend.medikey.controller;

import com.backend.medikey.model.Medication;
import com.backend.medikey.service.MedicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/medications")
public class MedicationController {

    @Autowired
    private MedicationService medicationService;

    // Get all medications
    @GetMapping
    public ResponseEntity<List<Medication>> getAllMedications() {
        return new ResponseEntity<>(medicationService.getAllMedications(), HttpStatus.OK); // 200 OK, body contains list of medications
    }

    // Get a specific medication by ID
    @GetMapping("/{id}")
    public ResponseEntity<Medication> getMedicationById(@PathVariable Long id) {
        return medicationService.getMedicationById(id)
                .map(medication -> new ResponseEntity<>(medication, HttpStatus.OK))// 200 OK, body contains medication, if found, else 404 NOT FOUND
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Get all medications for a specific user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Medication>> getMedicationsByUserId(@PathVariable Long userId) {
        return new ResponseEntity<>(medicationService.getMedicationsByUserId(userId), HttpStatus.OK);// 200 OK, body contains list of medications, if found, else 404 NOT FOUND
    }

    // Add a new medication
    @PostMapping
    public ResponseEntity<Medication> addMedication(@RequestBody Medication medication) {
        return new ResponseEntity<>(medicationService.addMedication(medication), HttpStatus.CREATED); //
    }

    // Update an existing medication
    @PutMapping("/{id}")
    public ResponseEntity<Medication> updateMedication(@PathVariable Long id, @RequestBody Medication medication) {
        // Ensure the ID from the path matches the ID of the medication object
        if (!id.equals(medication.getMedicationId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(medicationService.updateMedication(medication), HttpStatus.OK);
    }

    // Delete a medication by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedication(@PathVariable Long id) {
        medicationService.deleteMedication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}