package com.backend.medikey.service;

import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.model.Patient;
import java.util.List;
import java.util.Optional;

public interface PatientService {

    List<PatientDto> getAllPatients();

    PatientDto getPatientById(Long patientId);

    PatientDto createPatient(PatientDto patientDto);

    PatientDto updatePatient(Long id, PatientDto patientDto);

    void deletePatient(Long id);

    PatientDto getPatientByUserId(Long userId);

    Patient save(Patient patient);

    Patient update(Long id, Patient patient);

    void delete(Long id);
}
