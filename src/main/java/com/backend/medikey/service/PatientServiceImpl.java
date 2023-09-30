package com.backend.medikey.service;

import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import com.backend.medikey.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private HospitalRepository hospitalRepository;
    @Autowired
    private VisitRepository visitRepository;
    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;
    @Autowired
    private TestRepository testRepository;
    @Autowired
    private MedicationRepository medicationRepository;


    @Override
    public List<PatientDto> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<PatientDto> getPatientById(Long id) {
        return patientRepository.findById(id).map(this::convertToDto);
    }

    @Override
    public PatientDto createPatient(PatientDto patientDto) {
        Patient patient = convertToEntity(patientDto);
        Patient newPatient = patientRepository.save(patient);
        return convertToDto(newPatient);
    }

    @Override
    public PatientDto updatePatient(Long id, PatientDto patientDto) {
        Patient patient = convertToEntity(patientDto);
        patient.setPatientId(id);
        Patient updatedPatient = patientRepository.save(patient);
        return convertToDto(updatedPatient);
    }

    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    @Override
    public Optional<PatientDto> getPatientByUserId(Long userId) {
        return patientRepository.findByUserId(userId).map(this::convertToDto);
    }

    @Override
    public Patient save(Patient patient) {
        return patientRepository.save(patient);
    }

    @Override
    public Patient update(Long id, Patient patient) {
        patient.setPatientId(id);
        return patientRepository.save(patient);
    }

    @Override
    public void delete(Long id) {
        patientRepository.deleteById(id);
    }
    /*
    private PatientDto convertToDto(Patient patient) {
        PatientDto dto = new PatientDto();
        dto.setPatientId(patient.getPatientId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmail());
        dto.setPhone(patient.getPhone());
        dto.setUserId(patient.getUser().getUserId());
        dto.setHospitalId(patient.getHospital().getHospitalId());
        // Add other fields as needed
        return dto;
    }
*/
    private PatientDto convertToDto(Patient patient) {
        PatientDto dto = new PatientDto();
        dto.setPatientId(patient.getPatientId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmail());
        dto.setPhone(patient.getPhone());

        if(patient.getUser() != null) {
            dto.setUserId(patient.getUser().getUserId());
        }

        if(patient.getHospital() != null) {
            dto.setHospitalId(patient.getHospital().getHospitalId());
        }

        Patient patient = patientRepository.findByPatientId(patientId);
        dto.setPatientVisitIds(patient.getPatientVisitIds());
        dto.setMedicalHistoryIds(patient.getMedicalHistoryIds());
        dto.setTestIds(patient.getTestIds());
        dto.setMedicationIds(patient.getMedicationIds());
        // Add other fields as needed
        return dto;
    }

    private Patient convertToEntity(PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setPatientId(patientDto.getPatientId());
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        User user = userRepository.findByUserId(patientDto.getUserId());
        patient.setUser(user);
        patient.setHospital(hospitalRepository.findByHospitalId(patientDto.getHospitalId()));
        patient.setPatientVisits(visitRepository.findByPatient(patientRepository.findByPatientId(patientDto.getPatientId())));
        patient.setMedicalHistories(medicalHistoryRepository.findByPatient(patientRepository.findByPatientId(patientDto.getPatientId())));
        patient.setTests(testRepository.findByPatient(patientRepository.findByPatientId(patientDto.getPatientId())));
        patient.setMedications(medicationRepository.findByPatient(patientRepository.findByPatientId(patientDto.getPatientId())));
        // Fetch and set User and Hospital entities here
        // Add other fields as needed
        return patient;
    }
}
