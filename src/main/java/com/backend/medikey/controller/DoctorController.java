package com.backend.medikey.controller;

import com.backend.medikey.dto.DoctorDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/")
    public ResponseEntity<List<DoctorDto>> getAllDoctors() {
        List<DoctorDto> doctors = doctorService.getAllDoctors();
        List<DoctorDto> doctorDtos = doctors.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(doctorDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorDto> getDoctorById(@PathVariable Long id) {
        Optional<DoctorDto> doctor = doctorService.getDoctorById(id);
        return doctor.map(value -> new ResponseEntity<>(convertToDto(value), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/")
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

    private DoctorDto convertToDto(DoctorDto doctor) {
        DoctorDto doctorDto = new DoctorDto();
        doctorDto.setDoctorId(doctor.getDoctorId());
        doctorDto.setFirstName(doctor.getFirstName());
        doctorDto.setLastName(doctor.getLastName());
        doctorDto.setEmail(doctor.getEmail());
        doctorDto.setPhone(doctor.getPhone());
        doctorDto.setDepartment(doctor.getDepartment());
        doctorDto.setUserId(doctor.getUserId());
        doctorDto.setHospitalId(doctor.getHospitalId());
        doctorDto.setDoctorVisitIds(doctor.getDoctorVisitIds());
        return doctorDto;
    }

    private Doctor convertToEntity(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setDoctorId(doctorDto.getDoctorId());
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setEmail(doctorDto.getEmail());
        doctor.setPhone(doctorDto.getPhone());
        doctor.setDepartment(doctorDto.getDepartment());
        doctor.setUserId(doctorDto.getUserId());
        doctor.setHospitalId(doctorDto.getHospitalId());
        doctor.setDoctorVisitIds(doctorDto.getDoctorVisitIds());
        // Fetch and set the User and Hospital entities here
        return doctor;
    }
}