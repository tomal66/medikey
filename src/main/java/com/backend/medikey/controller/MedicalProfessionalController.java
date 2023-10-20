package com.backend.medikey.controller;

import com.backend.medikey.dto.MedicalProfessionalDto;
import com.backend.medikey.model.Hospital;
import com.backend.medikey.model.MedicalProfessional;
import com.backend.medikey.model.User;
import com.backend.medikey.service.MedicalProfessionalService;
import com.backend.medikey.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/medicalProfessionals")
public class MedicalProfessionalController {

    @Autowired
    private MedicalProfessionalService medicalProfessionalService;

    @Autowired
    private UserService userService;  // Assuming you have a UserService to fetch User entities

    // Get All Medical Professionals
    @GetMapping("/")
    public ResponseEntity<List<MedicalProfessionalDto>> getAllMedicalProfessionals() {
        List<MedicalProfessional> medicalProfessionals = medicalProfessionalService.findAll();
        List<MedicalProfessionalDto> dtos = medicalProfessionals.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    // Get Medical Professional by ID
    @GetMapping("/{id}")
    public ResponseEntity<MedicalProfessionalDto> getMedicalProfessionalById(@PathVariable Long id) {
        Optional<MedicalProfessional> medicalProfessional = medicalProfessionalService.findById(id);
        if (medicalProfessional.isPresent()) {
            return new ResponseEntity<>(convertToDto(medicalProfessional.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Create Medical Professional
    @PostMapping("/")
    public ResponseEntity<MedicalProfessionalDto> createMedicalProfessional(@RequestBody MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessional medicalProfessional = convertToEntity(medicalProfessionalDto);
        MedicalProfessional createdMedicalProfessional = medicalProfessionalService.save(medicalProfessional);
        return new ResponseEntity<>(convertToDto(createdMedicalProfessional), HttpStatus.CREATED);
    }

    // Update Medical Professional
    @PutMapping("/{id}")
    public ResponseEntity<MedicalProfessionalDto> updateMedicalProfessional(@PathVariable Long id, @RequestBody MedicalProfessionalDto medicalProfessionalDto) {
        Optional<MedicalProfessional> existingMedicalProfessional = medicalProfessionalService.findById(id);
        if (existingMedicalProfessional.isPresent()) {
            MedicalProfessional updatedMedicalProfessional = convertToEntity(medicalProfessionalDto);
            updatedMedicalProfessional.setMpId(id);  // Ensure the ID remains the same
            medicalProfessionalService.save(updatedMedicalProfessional);
            return new ResponseEntity<>(convertToDto(updatedMedicalProfessional), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete Medical Professional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalProfessional(@PathVariable Long id) {
        medicalProfessionalService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Convert to DTO
    private MedicalProfessionalDto convertToDto(MedicalProfessional medicalProfessional) {
        MedicalProfessionalDto dto = new MedicalProfessionalDto();
        dto.setMpId(medicalProfessional.getMpId());
        dto.setFirstName(medicalProfessional.getFirstName());
        dto.setLastName(medicalProfessional.getLastName());
        dto.setEmail(medicalProfessional.getEmail());
        dto.setPhone(medicalProfessional.getPhone());
        dto.setUserId(medicalProfessional.getUser().getUserId());
        dto.setHospitalId(medicalProfessional.getHospital().getHospitalId());
        return dto;
    }

    // Convert to Entity
    private MedicalProfessional convertToEntity(MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessional entity = new MedicalProfessional();
        entity.setMpId(medicalProfessionalDto.getMpId());
        entity.setFirstName(medicalProfessionalDto.getFirstName());
        entity.setLastName(medicalProfessionalDto.getLastName());
        entity.setEmail(medicalProfessionalDto.getEmail());
        entity.setPhone(medicalProfessionalDto.getPhone());

        User user = (User) userService.findById(medicalProfessionalDto.getUserId());
        entity.setUser(user);

        // Assuming you have a similar service for Hospital
        MedicalProfessionalService hospitalService = null;
        Hospital hospital = hospitalService.findById(medicalProfessionalDto.getHospitalId()).orElse(null).getHospital();
        entity.setHospital(hospital);

        return entity;
    }
}
