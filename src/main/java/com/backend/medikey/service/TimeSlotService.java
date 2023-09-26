package com.backend.medikey.service;

import com.backend.medikey.model.TimeSlot;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TimeSlotService {

    // Basic CRUD operations
    TimeSlot save(TimeSlot timeSlot);
    List<TimeSlot> findAll();
    Optional<TimeSlot> findById(Long id);
    void delete(Long id);

    List<TimeSlot> getTimeSlotByUserId(Long userId);

    // Custom query methods
    //List<TimeSlot> findByDoctorId(Long doctorId);
    List<TimeSlot> findByHospitalId(Long hospitalId);
    List<TimeSlot> findByDay(DayOfWeek day);
    List<TimeSlot> findByStartTime(LocalTime startTime);
    List<TimeSlot> findByEndTime(LocalTime endTime);
}