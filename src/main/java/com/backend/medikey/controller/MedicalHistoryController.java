/*
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

    @GetMapping("/hello")
    public String getHello(){return "Hello";}

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
*/

package com.backend.medikey.controller;

import com.backend.medikey.dto.MedicalHistoryDto;
import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.service.MedicalHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicalHistories")
@RequiredArgsConstructor
public class MedicalHistoryController {

    @Autowired
    private final MedicalHistoryService medicalHistoryService;

    @GetMapping("/")
    public ResponseEntity<List<MedicalHistoryDto>> getAllMedicalHistories() {
        List<MedicalHistory> medicalHistories = medicalHistoryService.getAllMedicalHistories();
        List<MedicalHistoryDto> dtos = medicalHistories.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MedicalHistoryDto> getMedicalHistoryById(@PathVariable Long id) {
        Optional<MedicalHistory> medicalHistory = medicalHistoryService.getMedicalHistoryById(id);
        return medicalHistory.map(value -> new ResponseEntity<>(convertToDto(value), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
    public ResponseEntity<MedicalHistoryDto> createMedicalHistory(@RequestBody MedicalHistoryDto medicalHistoryDto) {
        MedicalHistory medicalHistory = convertToEntity(medicalHistoryDto);
        MedicalHistory newMedicalHistory = medicalHistoryService.addMedicalHistory(medicalHistory);
        return new ResponseEntity<>(convertToDto(newMedicalHistory), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MedicalHistoryDto> updateMedicalHistory(@PathVariable Long id, @RequestBody MedicalHistoryDto medicalHistoryDto) {
        MedicalHistory updatedMedicalHistory = medicalHistoryService.updateMedicalHistory(convertToEntity(medicalHistoryDto));
        return new ResponseEntity<>(convertToDto(updatedMedicalHistory), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalHistory(@PathVariable Long id) {
        medicalHistoryService.deleteMedicalHistory(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private MedicalHistoryDto convertToDto(MedicalHistory medicalHistory) {
        MedicalHistoryDto dto = new MedicalHistoryDto();
        dto.setMedicalHistoryId(medicalHistory.getMedicalHistoryId());
        dto.setPatientId(medicalHistory.getPatient().getPatientId());
        dto.setVisitId(medicalHistory.getVisit().getVisitId());
        dto.setDiagnosis(medicalHistory.getDiagnosis());
        dto.setSymptoms(medicalHistory.getSymptoms());
        dto.setAllergies(medicalHistory.getAllergies());
        dto.setChronicDiseases(medicalHistory.getChronicDiseases());
        dto.setFamilyHistory(medicalHistory.getFamilyHistory());
        dto.setDateRecorded(medicalHistory.getDateRecorded());
        dto.setRecordedBy(medicalHistory.getRecordedBy().getMedicalProfessionalId());
        dto.setNotes(medicalHistory.getNotes());
        dto.setImmunizations(medicalHistory.getImmunizations());
        dto.setPreviousSurgeries(medicalHistory.getPreviousSurgeries());
        dto.setLifestyleFactors(medicalHistory.getLifestyleFactors());
        dto.setGeneticFactors(medicalHistory.getGeneticFactors());

        // Add other fields as needed
        return dto;
    }

    private MedicalHistory convertToEntity(MedicalHistoryDto medicalHistoryDto) {
        MedicalHistory medicalHistory = new MedicalHistory();
        medicalHistory.setMedicalHistoryId(medicalHistoryDto.getMedicalHistoryId());
        medicalHistory.setPatient(medicalHistoryDto.getPatient().findByUserId());
        medicalHistory.setVisit(medicalHistoryDto.getVisit().findByVisitId());
        medicalHistory.setDiagnosis(medicalHistoryDto.getDiagnosis());
        medicalHistory.setSymptoms(medicalHistoryDto.getSymptoms());
        medicalHistory.setAllergies(medicalHistoryDto.getAllergies());
        medicalHistory.setChronicDiseases(medicalHistoryDto.getChronicDiseases());
        medicalHistory.setFamilyHistory(medicalHistoryDto.getFamilyHistory());
        medicalHistory.setDateRecorded(medicalHistoryDto.getDateRecorded());
        medicalHistory.setRecordedBy(medicalHistoryDto.getRecordedById());
        medicalHistory.setNotes(medicalHistoryDto.getNotes());
        medicalHistory.setImmunizations(medicalHistoryDto.getImmunizations());
        medicalHistory.setPreviousSurgeries(medicalHistoryDto.getPreviousSurgeries());
        medicalHistory.setLifestyleFactors(medicalHistoryDto.getLifestyleFactors());
        medicalHistory.setGeneticFactors(medicalHistoryDto.getGeneticFactors());

        // Set other fields, you would typically fetch these entities from their respective services before setting them
        return medicalHistory;
    }
}
