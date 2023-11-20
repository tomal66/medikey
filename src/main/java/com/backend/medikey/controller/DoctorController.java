package com.backend.medikey.controller;

import com.backend.medikey.dto.DoctorDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.backend.medikey.model.Visit;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/all")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<DoctorDto> doctorDtos = doctorService.getAllDoctors();
        return new ResponseEntity<>(doctorDtos, HttpStatus.OK);
    }


    @GetMapping("/id/{id}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable Long id) {
        DoctorDto doctor = doctorService.getDoctorById(id);
        return new ResponseEntity<>(doctor, HttpStatus.OK);
    }

    @GetMapping("/{department}")
    public ResponseEntity<List<DoctorDto>> getDoctorByDepartment(@PathVariable String department) {
        List<DoctorDto> doctors = doctorService.getByDepartment(department);
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @GetMapping("/hospital/{hospitalId}")
    public ResponseEntity<List<DoctorDto>> getDoctorByHospital(@PathVariable Long hospitalId) {
        List<DoctorDto> doctors = doctorService.getByHospital(hospitalId);
        return new ResponseEntity<>(doctors, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<DoctorDto> createDoctor(@RequestBody DoctorDto doctorDto) {
        DoctorDto newDoctorDto = doctorService.createDoctor(doctorDto);
        return new ResponseEntity<>(newDoctorDto, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorDto> updateDoctor(@PathVariable Long id, @RequestBody DoctorDto doctorDto) {
        DoctorDto updatedDoctorDto = doctorService.updateDoctor(id, doctorDto);
        return new ResponseEntity<>(updatedDoctorDto, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDoctor(@PathVariable Long id) {
        doctorService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}