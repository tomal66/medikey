package com.backend.medikey.controller;

import com.backend.medikey.dto.TimeSlotDto;
import com.backend.medikey.model.TimeSlot;
import com.backend.medikey.repository.DoctorRepository;
import com.backend.medikey.repository.HospitalRepository;
import com.backend.medikey.service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/timeslots")
public class TimeSlotController {

    @Autowired
    private TimeSlotService timeSlotService;

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private HospitalRepository hospitalRepository;
    // Convert entity to DTO
    private TimeSlotDto convertToDto(TimeSlot timeSlot) {
        TimeSlotDto dto = new TimeSlotDto();
        dto.setTimeSlotId(timeSlot.getTimeSlotId());
        dto.setDoctorId(timeSlot.getDoctor().getDoctorId());
        dto.setHospitalId(timeSlot.getHospital().getHospitalId());
        dto.setDay(timeSlot.getDay());
        dto.setStartTime(timeSlot.getStartTime());
        dto.setEndTime(timeSlot.getEndTime());
        dto.setDuration(timeSlot.getDuration());
        return dto;
    }

    // Convert DTO to entity
    private TimeSlot convertToEntity(TimeSlotDto dto) {
        TimeSlot timeSlot = new TimeSlot();
        timeSlot.setTimeSlotId(dto.getTimeSlotId());
        // Assuming you have methods to find Doctor and Hospital by their IDs
        timeSlot.setDoctor(doctorRepository.findByDoctorId(dto.getDoctorId()));
        timeSlot.setHospital(hospitalRepository.findByHospitalId(dto.getHospitalId()));
        timeSlot.setDay(dto.getDay());
        timeSlot.setStartTime(dto.getStartTime());
        timeSlot.setEndTime(dto.getEndTime());
        timeSlot.setDuration(dto.getDuration());
        return timeSlot;
    }

    @GetMapping("/")
    public ResponseEntity<List<TimeSlotDto>> getAllTimeSlots() {
        List<TimeSlot> timeSlots = timeSlotService.findAll();
        List<TimeSlotDto> timeSlotDtos = timeSlots.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(timeSlotDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeSlotDto> getTimeSlotById(@PathVariable Long id) {
        Optional<TimeSlot> timeSlot = timeSlotService.findById(id);
        if (timeSlot.isPresent()) {
            return new ResponseEntity<>(convertToDto(timeSlot.get()), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/save")
    public ResponseEntity<TimeSlotDto> createTimeSlot(@RequestBody TimeSlotDto timeSlotDto) {
        TimeSlot timeSlot = convertToEntity(timeSlotDto);
        TimeSlot savedTimeSlot = timeSlotService.save(timeSlot);
        return new ResponseEntity<>(convertToDto(savedTimeSlot), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeSlotDto> updateTimeSlot(@PathVariable Long id, @RequestBody TimeSlotDto timeSlotDto) {
        Optional<TimeSlot> existingTimeSlot = timeSlotService.findById(id);
        if (existingTimeSlot.isPresent()) {
            TimeSlot updatedTimeSlot = convertToEntity(timeSlotDto);
            updatedTimeSlot.setTimeSlotId(id); // Ensure ID remains the same
            TimeSlot savedTimeSlot = timeSlotService.save(updatedTimeSlot);
            return new ResponseEntity<>(convertToDto(savedTimeSlot), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTimeSlot(@PathVariable Long id) {
        timeSlotService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<List<TimeSlotDto>> getAllTimeSlotByDoctor(@PathVariable Long doctorId) {
        List<TimeSlot> timeSlots = timeSlotService.findByDoctor(doctorId);
        List<TimeSlotDto> timeSlotDtos = timeSlots.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return new ResponseEntity<>(timeSlotDtos, HttpStatus.OK);
    }
}
