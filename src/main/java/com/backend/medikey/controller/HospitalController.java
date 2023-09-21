package com.backend.medikey.controller;

import com.backend.medikey.model.Hospital;
import com.backend.medikey.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController {

    @Autowired
    private HospitalService hospitalService;

    // Create a new hospital
    @PostMapping
    public ResponseEntity<Hospital> createHospital(@RequestBody Hospital hospital) {
        Hospital savedHospital = hospitalService.save(hospital);
        return new ResponseEntity<>(savedHospital, HttpStatus.CREATED);
    }

    // Get all hospitals
    @GetMapping
    public ResponseEntity<List<Hospital>> getAllHospitals() {
        List<Hospital> hospitals = hospitalService.findAll();
        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }

    // Get a hospital by ID
    @GetMapping("/{id}")
    public ResponseEntity<Hospital> getHospitalById(@PathVariable Long id) {
        Optional<Hospital> hospital = hospitalService.findById(id);
        return hospital.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update a hospital
    @PutMapping("/{id}")
    public ResponseEntity<Hospital> updateHospital(@PathVariable Long id, @RequestBody Hospital hospital) {
        hospitalService.findById(id).orElseThrow(() -> new RuntimeException("Hospital not found"));
        hospitalService.save(hospital);
        return new ResponseEntity<>(hospital, HttpStatus.OK);
    }

    // Delete a hospital
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHospital(@PathVariable Long id) {
        hospitalService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Custom query methods
    @GetMapping("/name/{name}")
    public ResponseEntity<List<Hospital>> getHospitalsByName(@PathVariable String name) {
        List<Hospital> hospitals = hospitalService.findByName(name);
        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }

    @GetMapping("/city/{city}")
    public ResponseEntity<List<Hospital>> getHospitalsByCity(@PathVariable String city) {
        List<Hospital> hospitals = hospitalService.findByCity(city);
        return new ResponseEntity<>(hospitals, HttpStatus.OK);
    }
}
