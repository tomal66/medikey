package com.backend.medikey.controller;

import com.backend.medikey.dto.AppointmentDto;
import com.backend.medikey.dto.BMIDto;
import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.dto.PatientHistoryDto;
import com.backend.medikey.model.Patient;
import com.backend.medikey.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @GetMapping("/")
    public ResponseEntity<List<PatientDto>> getAllPatients() {
        return new ResponseEntity<>(patientService.getAllPatients(), HttpStatus.OK);
    }

    @GetMapping("/age/{id}")
    public ResponseEntity<String> getPatientAge(@PathVariable Long id) {
        return new ResponseEntity<>(patientService.getAge(id), HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long patientId) {
        PatientDto patientDto = patientService.getPatientById(patientId);
        if (patientDto != null) {
            return new ResponseEntity<>(patientDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<PatientDto> getPatientByUserId(@PathVariable Long userId) {
        PatientDto patientDto = patientService.getPatientByUserId(userId);
        if (patientDto!=null) {
            return new ResponseEntity<>(patientDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/today/{patientId}")
    public ResponseEntity<List<AppointmentDto>> getTodaysAppointments(@PathVariable Long patientId) {
        try {
            List<AppointmentDto> appointments = patientService.getTodaysAppointments(patientId);
            if (appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/history/{patientId}")
    public ResponseEntity<List<PatientHistoryDto>> getPatientHistory(@PathVariable Long patientId) {
        try {
            List<PatientHistoryDto> patientHistory = patientService.getPatientHistoryById(patientId);
            if (patientHistory.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(patientHistory);
        } catch (Exception e) {
            // Log the exception details
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/bmi/{patientId}")
    public ResponseEntity<List<BMIDto>> getPatientBmi(@PathVariable Long patientId) {
        try {
            List<BMIDto> bmiData = patientService.getBmiData(patientId);
            if (bmiData.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(bmiData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/phone/{phone}")
    public ResponseEntity<PatientDto> getPatientByPhone(@PathVariable String phone) {
        PatientDto patientDto = patientService.getByPhone(phone);
        if (patientDto!=null) {
            return new ResponseEntity<>(patientDto, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }



    @PostMapping("/")
    public ResponseEntity<PatientDto> createPatient(@RequestBody PatientDto patientDto) {
        PatientDto newPatient = patientService.createPatient(patientDto);
        return new ResponseEntity<>(newPatient, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientDto> updatePatient(@PathVariable Long id, @RequestBody PatientDto patientDto) {
        PatientDto updatedPatient = patientService.updatePatient(id, patientDto);
        return new ResponseEntity<>(updatedPatient, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
