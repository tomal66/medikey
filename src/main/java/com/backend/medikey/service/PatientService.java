package com.backend.medikey.service;

import com.backend.medikey.dto.AppointmentDto;
import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.dto.PatientHistoryDto;
import com.backend.medikey.model.Patient;
import java.util.List;
import java.util.Optional;

public interface PatientService {

    List<PatientDto> getAllPatients();

    String getAge(Long patientId);

    PatientDto getByPhone(String phone);

    PatientDto getPatientById(Long patientId);

    PatientDto createPatient(PatientDto patientDto);

    PatientDto updatePatient(Long id, PatientDto patientDto);

    void deletePatient(Long id);
    List<PatientHistoryDto> getPatientHistoryById(Long patientId);
    PatientDto getPatientByUserId(Long userId);
    List<AppointmentDto> getTodaysAppointments(Long patientId);

    Patient save(Patient patient);

    Patient update(Long id, Patient patient);

    void delete(Long id);
}
