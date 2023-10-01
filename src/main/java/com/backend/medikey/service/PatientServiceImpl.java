package com.backend.medikey.service;

import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.model.*;
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

    /*@Override
    public PatientDto getPatientById(Long patientId) {
        return patientRepository.findByPatientId(patientId).map(this::convertToDto);
    }*/

    @Override
    public PatientDto getPatientById(Long patientId) {
        Patient patient = patientRepository.findByPatientId(patientId);
        if (patient != null) {
            return convertToDto(patient);
        } else {
            return null; // or throw an exception, depending on your use case
        }
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

        //Patient patient = patientRepository.findByPatientId(patientId);
        /*dto.setPatientVisitIds(patient.getPatientVisitIds());
        dto.setMedicalHistoryIds(patient.getMedicalHistoryIds());
        dto.setTestIds(patient.getTestIds());
        dto.setMedicationIds(patient.getMedicationIds());*/
        // Assuming patient.getPatientVisits() returns List<Visit>
        Visit visit = new Visit();
        List<Long> patientVisitIds = patient.getPatientVisits().stream()
                .map(Visit::getVisitId)
                .collect(Collectors.toList());
        dto.setPatientVisitIds(patientVisitIds);

// Assuming patient.getMedicalHistories() returns List<MedicalHistory>
        MedicalHistory medicalHistory = new MedicalHistory();
        List<Long> medicalHistoryIds = patient.getMedicalHistories().stream()
                .map(MedicalHistory::getMedicalHistoryId)
                .collect(Collectors.toList());
        dto.setMedicalHistoryIds(medicalHistoryIds);

// Assuming patient.getTests() returns List<Test>
        Test test = new Test();
        List<Long> testIds = patient.getTests().stream()
                .map(Test::getTestsId)
                .collect(Collectors.toList());
        dto.setTestIds(testIds);

// Assuming patient.getMedications() returns List<Medication>
        List<Long> medicationIds = patient.getMedications().stream()
                .map(Medication::getMedicationId)
                .collect(Collectors.toList());
        dto.setMedicationIds(medicationIds);

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
