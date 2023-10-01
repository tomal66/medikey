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
    private PatientRepository patientRepository;
    @Autowired
    private DoctorService doctorService;

    @Autowired
    private PatientService patientService;

    @Autowired
    private MedicationService medicationService;

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    @Autowired
    private HospitalService hospitalService;

    @Autowired
    private MedicationRepository medicationRepository;
    // Convert entity to DTO
    // Convert entity to DTO
   /* private VisitDto convertToDto(Visit visit) {
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
    }*/

    // Convert DTO to entity
   /* private Visit convertToEntity(VisitDto dto) {
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
    }*/

   /* private Visit convertToEntity(VisitDto dto) {
        Visit visit = new Visit();
        visit.setVisitId(dto.getVisitId());

        // Assuming getDoctorById and findByHospitalId return the actual entity and not DTOs
        visit.setDoctor(doctorService.getDoctorById(dto.getDoctorId()));
        visit.setHospital(hospitalService.findByHospitalId(dto.getHospitalId()));

        // Convert PatientDto to Patient entity
        PatientDto patientDto = patientService.getPatientById(dto.getPatientId());
        Patient patient = convertPatientDtoToEntity(patientDto);  // Use a different method for PatientDto
        visit.setPatient(patient);

        // Assuming getMedicalHistoriesByUserId returns a list of MedicalHistory entities
        visit.setMedicalHistory((MedicalHistory) medicalHistoryService.getMedicalHistoriesByUserId(dto.getPatientId()));

        visit.setVisitDate(dto.getVisitDate());
        visit.setArrivalTime(dto.getArrivalTime());
        visit.setCheckingTime(dto.getCheckingTime());
        visit.setReason(dto.getReason());
        visit.setTests(dto.getTests());
        visit.setFollowUpDate(dto.getFollowUpDate());
        return visit;
    }
*/

    private Visit convertToEntity(VisitDto dto) {
        Visit visit = new Visit();
        visit.setVisitId(dto.getVisitId());
        visit.setDoctor(doctorService.getDoctorById(dto.getDoctorId())); // Assuming this method returns a Doctor entity
        visit.setPatient(patientRepository.findByPatientId(dto.getPatientId())); // Assuming this method returns a Patient entity
        visit.setMedicalHistory(medicalHistoryRepository.findByVisit_VisitId(visit.getVisitId())); // Assuming this method returns a MedicalHistory entity
        visit.setHospital(hospitalService.findByHospitalId(dto.getHospitalId())); // Assuming this method returns a Hospital entity
        visit.setVisitDate(dto.getVisitDate());
        visit.setArrivalTime(dto.getArrivalTime());
        visit.setCheckingTime(dto.getCheckingTime());
        visit.setReason(dto.getReason());
        visit.setTests(dto.getTests());
        visit.setFollowUpDate(dto.getFollowUpDate());

        // Assuming medicationService.findMedicationById returns a Medication entity
        List<Medication> medications = medicationRepository.findByVisit(visit);
        visit.setMedications(medications);

        return visit;
    }

    private VisitDto convertToDto(Visit entity) {
        VisitDto dto = new VisitDto();
        dto.setVisitId(entity.getVisitId());
        dto.setDoctorId(entity.getDoctor().getDoctorId());
        dto.setPatientId(entity.getPatient().getPatientId());
        dto.setPatientName(entity.getPatient().getFirstName() + " " + entity.getPatient().getLastName());
        dto.setMedicalHistoryId(entity.getMedicalHistory().getMedicalHistoryId());
        dto.setHospitalId(entity.getHospital().getHospitalId());
        dto.setVisitDate(entity.getVisitDate());
        dto.setArrivalTime(entity.getArrivalTime());
        dto.setCheckingTime(entity.getCheckingTime());
        dto.setReason(entity.getReason());
        dto.setTests(entity.getTests());
        dto.setFollowUpDate(entity.getFollowUpDate());

        List<Long> medicationIds = entity.getMedications().stream()
                .map(Medication::getMedicationId)
                .collect(Collectors.toList());
        dto.setMedicationIds(medicationIds);

        return dto;
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
