package com.backend.medikey.controller;

import com.backend.medikey.dto.VisitDto;
import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Visit;
import com.backend.medikey.repository.MedicalHistoryRepository;
import com.backend.medikey.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/visits")
public class VisitController {

    @Autowired
    private VisitService visitService;
    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @Autowired
    private HospitalService hospitalService;
    // Convert entity to DTO
    // Convert entity to DTO
    private VisitDto convertToDto(Visit visit) {
        VisitDto dto = new VisitDto();
        dto.setVisitId(visit.getVisitId());
        dto.setDoctorId(visit.getDoctor().getDoctorId());
        dto.setPatientId(visit.getPatient().getPatientId());
        dto.setPatientName(visit.getPatient().getFirstName() + " " + visit.getPatient().getLastName());
        dto.setMedicalHistoryId(visit.getMedicalHistory().getMedicalHistoryId()); // Assuming MedicalHistory has a getMedicalHistoryId method
        dto.setHospitalId(visit.getHospital().getHospitalId());
        dto.setVisitDate(visit.getVisitDate());
        dto.setArrivalTime(visit.getArrivalTime());
        dto.setCheckingTime(visit.getCheckingTime());
        dto.setReason(visit.getReason());
        dto.setTests(visit.getTests());
        dto.setFollowUpDate(visit.getFollowUpDate());
        return dto;
    }

    // Convert DTO to entity
    private Visit convertToEntity(VisitDto dto) {
        Visit visit = new Visit();
        visit.setVisitId(dto.getVisitId());
        visit.setDoctor(doctorService.getDoctorById(dto.getDoctorId()));
        visit.setPatient(patientService.getPatientById(dto.getPatientId()));
        visit.setMedicalHistory(medicalHistoryService.getMedicalHistoriesByUserId(dto.getpatientId())); // Assuming you have a findMedicalHistoryById method
        visit.setHospital(hospitalService.findByHospitalId(dto.getHospitalId()));
        visit.setVisitDate(dto.getVisitDate());
        visit.setArrivalTime(dto.getArrivalTime());
        visit.setCheckingTime(dto.getCheckingTime());
        visit.setReason(dto.getReason());
        visit.setTests(dto.getTests());
        visit.setFollowUpDate(dto.getFollowUpDate());
        return visit;
    }


    // Get all visits
    @GetMapping
    public ResponseEntity<List<VisitDto>> getAllVisits() {
        List<Visit> visits = visitService.getAllVisits();
        List<VisitDto> visitDtos = visits.stream().map(this::convertToDto).collect(Collectors.toList());
        return new ResponseEntity<>(visitDtos, HttpStatus.OK);
    }

    // Get a specific visit by ID
    @GetMapping("/{id}")
    public ResponseEntity<VisitDto> getVisitById(@PathVariable Long id) {
        Optional<Visit> visit = visitService.getVisitById(id);
        return visit.map(value -> new ResponseEntity<>(convertToDto(value), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Add a new visit
    @PostMapping
    public ResponseEntity<VisitDto> addVisit(@RequestBody VisitDto visitDto) {
        Visit visit = convertToEntity(visitDto);
        Visit savedVisit = visitService.addVisit(visit);
        return new ResponseEntity<>(convertToDto(savedVisit), HttpStatus.CREATED);
    }

    // Update an existing visit
    @PutMapping("/{id}")
    public ResponseEntity<VisitDto> updateVisit(@PathVariable Long id, @RequestBody VisitDto visitDto) {
        if (!id.equals(visitDto.getVisitId())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Visit visit = convertToEntity(visitDto);
        Visit updatedVisit = visitService.updateVisit(visit);
        return new ResponseEntity<>(convertToDto(updatedVisit), HttpStatus.OK);
    }

    // Delete a visit by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
