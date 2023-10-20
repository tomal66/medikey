package com.backend.medikey.controller;

import com.backend.medikey.dto.HospitalDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.model.Hospital;
import com.backend.medikey.model.User;
import com.backend.medikey.model.Visit;
import com.backend.medikey.service.HospitalService;
import com.backend.medikey.service.UserService;
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
    @Autowired
    private UserService userService;
    @Autowired
    private AuthController authController;

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
        hospital.setUser(userService.findById(dto.getUserId()));

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
    /*@GetMapping("/{id}")
    public ResponseEntity<HospitalDto> getHospitalById(@PathVariable Long hospitalId) {
        Hospital hospital = hospitalService.findByHospitalId(hospitalId);
        return hospital.map(value -> new ResponseEntity<>(convertToDto(value), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }*/

    @GetMapping("/{hospitalId}")
    public ResponseEntity<HospitalDto> getHospitalById(@PathVariable Long hospitalId) {
        Hospital hospital = hospitalService.findByHospitalId(hospitalId);
        if (hospital != null) {
            return new ResponseEntity<>(convertToDto(hospital), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // Add a new hospital
    @PostMapping
    public ResponseEntity<?> addHospital(@RequestBody HospitalDto hospitalDto) {
        Hospital hospital = convertToEntity(hospitalDto);
        Hospital newHospital = hospitalService.save(hospital);
        return new ResponseEntity<>("Hospital added!", HttpStatus.CREATED);
    }



    @PutMapping("/{hospitalId}")  // Changed 'hospitalid' to 'hospitalId' to match the method parameter
    public ResponseEntity<HospitalDto> updateHospital(@PathVariable Long hospitalId, @RequestBody HospitalDto hospitalDto) {  // Changed 'id' to 'hospitalId'
        Hospital existingHospital = hospitalService.findByHospitalId(hospitalId);  // Removed Optional since your service method returns a Hospital, not an Optional<Hospital>
        if (existingHospital != null) {  // Changed from isPresent() to != null
            Hospital hospital = convertToEntity(hospitalDto);
            hospital.setHospitalId(hospitalId);  // Ensure the ID remains the same
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
