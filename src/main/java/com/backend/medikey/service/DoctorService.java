package com.backend.medikey.service;

import com.backend.medikey.dto.DoctorDto;
import com.backend.medikey.model.Doctor;
import java.util.List;
import java.util.Optional;

public interface DoctorService {

    List<DoctorDto> getAllDoctors();

    Optional<DoctorDto> getDoctorById(Long id);

    DoctorDto createDoctor(DoctorDto doctorDto);

    DoctorDto updateDoctor(Long id, DoctorDto doctorDto);

    void deleteDoctor(Long id);

    Optional<DoctorDto> getDoctorByUserId(Long userId);


    void delete(Long id);
}
