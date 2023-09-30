package com.backend.medikey.service;

import com.backend.medikey.dto.DoctorDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DoctorServiceImpl implements DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public List<DoctorDto> getAllDoctors() {
        return doctorRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<DoctorDto> getDoctorById(Long id) {
        return doctorRepository.findById(id).map(this::convertToDto);
    }

    @Override
    public DoctorDto createDoctor(DoctorDto doctorDto) {
        Doctor doctor = convertToEntity(doctorDto);
        Doctor savedDoctor = doctorRepository.save(doctor);
        return convertToDto(savedDoctor);
    }

    @Override
    public DoctorDto updateDoctor(Long id, DoctorDto doctorDto) {
        Doctor existingDoctor = doctorRepository.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
        existingDoctor.setFirstName(doctorDto.getFirstName());
        existingDoctor.setLastName(doctorDto.getLastName());
        existingDoctor.setEmail(doctorDto.getEmail());
        existingDoctor.setPhone(doctorDto.getPhone());
        existingDoctor.setDepartment(doctorDto.getDepartment());
        existingDoctor.setUserId(doctorDto.getUserId());
        existingDoctor.setHospitalId(doctorDto.getHospitalId());
        Doctor updatedDoctor = doctorRepository.save(existingDoctor);
        return convertToDto(updatedDoctor);
    }

    @Override
    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    @Override
    public Optional<DoctorDto> getDoctorByUserId(Long userId) {
        return doctorRepository.findByUserId(userId).map(this::convertToDto);
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
        dto.setUserId(doctor.getUser().getUserId());
        dto.setHospitalId(doctor.getHospital().getHospitalId());
        return dto;
    }

    private Doctor convertToEntity(DoctorDto doctorDto) {
        Doctor doctor = new Doctor();
        doctor.setFirstName(doctorDto.getFirstName());
        doctor.setLastName(doctorDto.getLastName());
        doctor.setEmail(doctorDto.getEmail());
        doctor.setPhone(doctorDto.getPhone());
        doctor.setDepartment(doctorDto.getDepartment());
        doctor.setUserId(doctorDto.getUserId());
        doctor.setHospitalId(doctorDto.getHospitalId());


        // Fetch and set the User and Hospital entities here

        return doctor;
    }
}