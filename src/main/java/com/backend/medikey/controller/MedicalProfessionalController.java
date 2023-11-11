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
    @GetMapping
    public ResponseEntity<List<MedicalProfessionalDto>> getAllMedicalProfessionals() {
        List<MedicalProfessionalDto> dtos = medicalProfessionalService.findAll();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    // Get Medical Professional by ID
    @GetMapping("/{id}")
    public ResponseEntity<MedicalProfessionalDto> getMedicalProfessionalById(@PathVariable Long id) {
        MedicalProfessionalDto medicalProfessionalDto = medicalProfessionalService.findById(id);
        if (medicalProfessionalDto!=null) {
            return new ResponseEntity<>(medicalProfessionalDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/hospital/{id}")
    public ResponseEntity<List<MedicalProfessionalDto>> getMedicalProfessionalByHospitalId(@PathVariable Long id) {
        List<MedicalProfessionalDto> dtos = medicalProfessionalService.findByHospital(id);
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    // Create Medical Professional
    @PostMapping
    public ResponseEntity<MedicalProfessionalDto> createMedicalProfessional(@RequestBody MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessionalDto dto = medicalProfessionalService.save(medicalProfessionalDto);
        return new ResponseEntity<>(dto, HttpStatus.CREATED);
    }

    // Update Medical Professional
    @PutMapping("/{id}")
    public ResponseEntity<MedicalProfessionalDto> updateMedicalProfessional(@PathVariable Long id, @RequestBody MedicalProfessionalDto medicalProfessionalDto) {
        MedicalProfessionalDto existingMedicalProfessional = medicalProfessionalService.findById(id);
        if (existingMedicalProfessional!=null) {
            MedicalProfessionalDto dto = medicalProfessionalService.save(medicalProfessionalDto);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete Medical Professional
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMedicalProfessional(@PathVariable Long id) {
        medicalProfessionalService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
