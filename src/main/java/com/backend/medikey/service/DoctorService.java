package com.backend.medikey.service;

import com.backend.medikey.dto.DoctorDto;
import com.backend.medikey.dto.TimeSlotDto;
import com.backend.medikey.model.Doctor;
import java.util.List;
import java.util.Optional;

public interface DoctorService {

    List<DoctorDto> getAllDoctors();

    Doctor getDoctorById(Long id);

    DoctorDto createDoctor(DoctorDto doctorDto);

    DoctorDto updateDoctor(Long id, DoctorDto doctorDto);

    void deleteDoctor(Long id);

    List<DoctorDto> getByDepartment(String department);

    Optional<DoctorDto> getDoctorByUserId(Long userId);
    List<DoctorDto> getByHospital(Long hospitalId);



    void delete(Long id);
}
