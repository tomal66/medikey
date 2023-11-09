package com.backend.medikey.controller;

import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.dto.VisitDto;
import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.Visit;
import com.backend.medikey.repository.MedicalHistoryRepository;
import com.backend.medikey.repository.MedicationRepository;
import com.backend.medikey.repository.PatientRepository;
import com.backend.medikey.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired
    private VisitService visitService;

    // Get all visits
    @GetMapping
    public ResponseEntity<List<VisitDto>> getAllVisits() {
        List<VisitDto> visitDtos = visitService.getAllVisits();
        return new ResponseEntity<>(visitDtos, HttpStatus.OK);
    }

    // Get a specific visit by ID
    @GetMapping("/{id}")
    public ResponseEntity<VisitDto> getVisitById(@PathVariable Long id) {
        Optional<VisitDto> visitDto = visitService.getVisitById(id);
        return visitDto.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<VisitDto>> getVisitsByDoctorAndDate(
            @PathVariable Long doctorId,
            @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date visitDate) {
        try {
            List<VisitDto> visits = visitService.getVisitsByDoctorAndVisitDate(visitDate, doctorId);
            return ResponseEntity.ok(visits);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Endpoint to check if a doctor is available on a specific date
    @GetMapping("/doctor/{doctorId}/availability")
    public ResponseEntity<?> checkDoctorAvailability(@PathVariable Long doctorId, @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        boolean isAvailable = visitService.isDoctorAvailable(doctorId, date);
        if (isAvailable) {
            return new ResponseEntity<>("Doctor is available on the selected date.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No slot available on selected date!", HttpStatus.OK);
        }
    }

    // Add a new visit
    @PostMapping
    public ResponseEntity<?> addVisit(@RequestBody VisitDto visitDto) {
        try {
            VisitDto savedVisitDto = visitService.addVisit(visitDto);
            return new ResponseEntity<>(savedVisitDto, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Update an existing visit
    @PutMapping("/{id}")
    public ResponseEntity<?> updateVisit(@PathVariable Long id, @RequestBody VisitDto visitDto) {
        if (!id.equals(visitDto.getVisitId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        try {
            VisitDto updatedVisitDto = visitService.updateVisit(visitDto);
            return new ResponseEntity<>(updatedVisitDto, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    // Delete a visit by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
