package com.backend.medikey.service;

import com.backend.medikey.model.TimeSlot;
import com.backend.medikey.repository.TimeSlotRepository;
import com.backend.medikey.service.TimeSlotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TimeSlotServiceImpl implements TimeSlotService {

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Override
    public TimeSlot save(TimeSlot timeSlot) {
        return timeSlotRepository.save(timeSlot);
    }

    @Override
    public List<TimeSlot> findAll() {
        return timeSlotRepository.findAll();
    }

    @Override
    public Optional<TimeSlot> findById(Long id) {
        return timeSlotRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        timeSlotRepository.deleteById(id);
    }

    @Override
    public List<TimeSlot> findByDoctorId(Long doctorId) {
        return timeSlotRepository.findByDoctor_Id(doctorId);
    }

    @Override
    public List<TimeSlot> findByHospitalId(Long hospitalId) {
        return timeSlotRepository.findByHospital_HospitalId(hospitalId);
    }

    @Override
    public List<TimeSlot> findByDay(DayOfWeek day) {
        return timeSlotRepository.findByDay(day);
    }

    @Override
    public List<TimeSlot> findByStartTime(LocalTime startTime) {
        return timeSlotRepository.findByStartTime(startTime);
    }

    @Override
    public List<TimeSlot> findByEndTime(LocalTime endTime) {
        return timeSlotRepository.findByEndTime(endTime);
    }
}