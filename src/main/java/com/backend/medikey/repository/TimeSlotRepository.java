package com.backend.medikey.repository;

import com.backend.medikey.model.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {

    // Find all time slots for a specific doctor
    List<TimeSlot> findByDoctor_Id(Long doctorId);

    // Find all time slots for a specific hospital
    List<TimeSlot> findByHospital_HospitalId(Long hospitalId);

    // Find all time slots for a specific day
    List<TimeSlot> findByDay(DayOfWeek day);

    // Find all time slots that start at a specific time
    List<TimeSlot> findByStartTime(LocalTime startTime);

    // Find all time slots that end at a specific time
    List<TimeSlot> findByEndTime(LocalTime endTime);
}
