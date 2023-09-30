package com.backend.medikey.controller;

import com.backend.medikey.dto.HospitalDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.model.Hospital;
import com.backend.medikey.model.Visit;
import com.backend.medikey.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    // Convert Hospital to HospitalDto
    private HospitalDto convertToDto(Hospital hospital) {
        HospitalDto dto = new HospitalDto();
        dto.setHospitalId(hospital.getHospitalId());
        dto.setName(hospital.getName());
        dto.setAddress(hospital.getAddress());
        dto.setCity(hospital.getCity());
        dto.setState(hospital.getState());
        dto.setCountry(hospital.getCountry());
        dto.setPostalCode(hospital.getPostalCode());
        dto.setPhoneNumber(hospital.getPhoneNumber());
        dto.setEmail(hospital.getEmail());

        if (hospital.getDoctors() != null) {
            Doctor doctor = new Doctor();
            dto.setDoctorIds(hospital.getDoctors().stream()
                    .map(Doctor::getDoctorId)
                    .collect(Collectors.toList()));
        }
        if (hospital.getVisits() != null) {
            Visit visit = new Visit();
            dto.setVisitIds(hospital.getVisits().stream()
                    .map(Visit::getVisitId)
                    .collect(Collectors.toList()));
        }
        // Add other fields as needed
        return dto;
    }

    // Convert HospitalDto to Hospital
    private Hospital convertToEntity(HospitalDto dto) {
        Hospital hospital = new Hospital();
        hospital.setName(dto.getName());
        hospital.setAddress(dto.getAddress());
        hospital.setCity(dto.getCity());
        hospital.setState(dto.getState());
        hospital.setCountry(dto.getCountry());
        hospital.setPostalCode(dto.getPostalCode());
        hospital.setPhoneNumber(dto.getPhoneNumber());
        hospital.setEmail(dto.getEmail());

        if (dto.getDoctorIds() != null) {
            List<Doctor> doctors = dto.getDoctorIds().stream()
                    .map(Doctor::new)  // This only sets the ID, not the other fields
                    .collect(Collectors.toList());
            hospital.setDoctors(doctors);
        }
        if (dto.getVisitIds() != null) {
            List<Visit> visits = dto.getVisitIds().stream()
                    .map(Visit::new)  // This only sets the ID, not the other fields
                    .collect(Collectors.toList());
            hospital.setVisits(visits);
        }
        // Add other fields as needed
        return hospital;
    }

    // Get all hospitals
    @GetMapping
    public ResponseEntity<List<HospitalDto>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.findAll();
        List<HospitalDto> hospitalDtos = hospitals.stream().map(this::convertToDto).collect(Collectors.toList());
        return new ResponseEntity<>(hospitalDtos, HttpStatus.OK);
    }

    // Get a specific hospital by ID
    @GetMapping("/{id}")
    public ResponseEntity<HospitalDto> getHospitalById(@PathVariable Long id) {
        Optional<Hospital> hospital = hospitalService.findById(id);
        return hospital.map(value -> new ResponseEntity<>(convertToDto(value), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Add a new hospital
    @PostMapping
    public ResponseEntity<HospitalDto> addHospital(@RequestBody HospitalDto hospitalDto) {
        Hospital hospital = convertToEntity(hospitalDto);
        Hospital newHospital = hospitalService.save(hospital);
        return new ResponseEntity<>(convertToDto(newHospital), HttpStatus.CREATED);
    }

    // Update an existing hospital
    @PutMapping("/{id}")
    public ResponseEntity<HospitalDto> updateHospital(@PathVariable Long id, @RequestBody HospitalDto hospitalDto) {
        Optional<Hospital> existingHospital = hospitalService.findById(id);
        if (existingHospital.isPresent()) {
            Hospital hospital = convertToEntity(hospitalDto);
            hospital.setHospitalId(id);  // Ensure the ID remains the same
            Hospital updatedHospital = hospitalService.save(hospital);
            return new ResponseEntity<>(convertToDto(updatedHospital), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a hospital by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        hospitalService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
