package com.backend.medikey.service;

import com.backend.medikey.dto.DoctorDto;
import com.backend.medikey.dto.TimeSlotDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.repository.DoctorRepository;
import com.backend.medikey.repository.HospitalRepository;
import com.backend.medikey.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public List<DoctorDto> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public DoctorDto getDoctorById(Long doctorId) {
        return convertToDto(doctorRepository.findByDoctorId(doctorId));
    }

    @Override
    public DoctorDto createDoctor(DoctorDto doctorDto) {
        Doctor doctor = convertToEntity(doctorDto);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDto(savedDoctor);
    }

    @Override
    public DoctorDto updateDoctor(Long id, DoctorDto doctorDto) {
        Doctor existingDoctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        existingDoctor.setFirstName(doctorDto.getFirstName());
        existingDoctor.setLastName(doctorDto.getLastName());
        existingDoctor.setEmail(doctorDto.getEmail());
        existingDoctor.setPhone(doctorDto.getPhone());
        existingDoctor.setDepartment(doctorDto.getDepartment());
        existingDoctor.setTitle(doctorDto.getTitle()); // Update the title
        existingDoctor.setMaxPatients(doctorDto.getMaxPatients()); // Update the maxPatients
        existingDoctor.setDaysOfWeek(doctorDto.getDaysOfWeek()); // Update the daysOfWeek
        existingDoctor.setStartTime(doctorDto.getStartTime()); // Update the startTime
        existingDoctor.setUser(userRepository.findByUserId(doctorDto.getUserId()));
        existingDoctor.setHospital(hospitalRepository.findByHospitalId(doctorDto.getHospitalId()));
        existingDoctor.setProfileImage(doctorDto.getProfileImage());
        // Save the updated doctor info
        Doctor updatedDoctor = doctorRepository.save(existingDoctor);

        // Convert to DTO and return
        return convertToDto(updatedDoctor);
    }


    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    @Override
    public List<DoctorDto> getByDepartment(String department) {
        return doctorRepository.findByDepartment(department).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }


    @Override
    public DoctorDto getDoctorByUserId(Long userId) {
        return convertToDto(doctorRepository.findByUser_UserId(userId));
    }

    @Override
    public List<DoctorDto> getByHospital(Long hospitalId) {
        return doctorRepository.findByHospital_HospitalId(hospitalId).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        doctorRepository.deleteById(id);
    }

    private DoctorDto convertToDto(Doctor doctor) {
        DoctorDto dto = new DoctorDto();
        dto.setDoctorId(doctor.getDoctorId());
        dto.setFirstName(doctor.getFirstName());
        dto.setLastName(doctor.getLastName());
        dto.setEmail(doctor.getEmail());
        dto.setPhone(doctor.getPhone());
        dto.setDepartment(doctor.getDepartment());
        dto.setTitle(doctor.getTitle()); // Set the title
        dto.setMaxPatients(doctor.getMaxPatients()); // Set the maxPatients
        dto.setMinutes(doctor.getMinutes());
        dto.setDaysOfWeek(doctor.getDaysOfWeek()); // Set the daysOfWeek
        dto.setStartTime(doctor.getStartTime()); // Set the startTime
        dto.setUserId(doctor.getUser().getUserId());
        dto.setHospitalId(doctor.getHospital().getHospitalId());
        dto.setProfileImage(doctor.getProfileImage());
        return dto;
    }

    private Doctor convertToEntity(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        if (doctorDto.getDoctorId() != null) { // Only set if ID is present
            doctor.setDoctorId(doctorDto.getDoctorId());
        }
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setEmail(doctorDto.getEmail());
        doctor.setPhone(doctorDto.getPhone());
        doctor.setDepartment(doctorDto.getDepartment());
        doctor.setTitle(doctorDto.getTitle()); // Get the title
        doctor.setMaxPatients(doctorDto.getMaxPatients()); // Get the maxPatients
        doctor.setMinutes(doctorDto.getMinutes());
        doctor.setDaysOfWeek(doctorDto.getDaysOfWeek()); // Get the daysOfWeek
        doctor.setStartTime(doctorDto.getStartTime()); // Get the startTime
        doctor.setUser(userRepository.findByUserId(doctorDto.getUserId()));
        doctor.setHospital(hospitalRepository.findByHospitalId(doctorDto.getHospitalId()));
        if(doctorDto.getProfileImage() != null) {
            doctor.setProfileImage(doctor.getProfileImage());
        }
        // Fetch and set the User and Hospital entities here

        return doctor;
    }

}
