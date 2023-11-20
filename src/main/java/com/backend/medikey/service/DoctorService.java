package com.backend.medikey.service;

import com.backend.medikey.dto.DoctorDto;

import java.util.List;

public interface DoctorService {

    List<DoctorDto> getAllDoctors();

    DoctorDto getDoctorById(Long id);

    DoctorDto createDoctor(DoctorDto doctorDto);

    DoctorDto updateDoctor(Long id, DoctorDto doctorDto);

    void deleteDoctor(Long id);

    List<DoctorDto> getByDepartment(String department);

    DoctorDto getDoctorByUserId(Long userId);
    List<DoctorDto> getByHospital(Long hospitalId);



    void delete(Long id);
}
