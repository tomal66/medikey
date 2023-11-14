package com.backend.medikey.service;

import com.backend.medikey.dto.AppointmentDto;
import com.backend.medikey.dto.MedicationDto;
import com.backend.medikey.dto.PatientDto;
import com.backend.medikey.dto.PatientHistoryDto;
import com.backend.medikey.model.*;
import com.backend.medikey.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
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
    private MedicationService medicationService;
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
    public String getAge(Long patientId) {
        Patient patient = patientRepository.findByPatientId(patientId);
        // Convert Date to LocalDate
        LocalDate birthDate = patient.getDateOfBirth().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        // Get the current date
        LocalDate currentDate = LocalDate.now();

        // Calculate the period between the current date and date of birth
        Period period = Period.between(birthDate, currentDate);

        // Format and return the age as a string
        return period.getYears() + " yrs " + period.getMonths() + " months";
    }

    @Override
    public PatientDto getByPhone(String phone) {
        return convertToDto(patientRepository.findByPhone(phone));
    }

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
        Patient patient = new Patient();
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        User user = userRepository.findByUserId(patientDto.getUserId());
        patient.setUser(user);
        patient.setDateOfBirth(patientDto.getDateOfBirth());
        Patient newPatient = patientRepository.save(patient);
        patientDto.setPatientId(newPatient.getPatientId());
        return patientDto;
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
    public List<PatientHistoryDto> getPatientHistoryById(Long patientId) {
        List<PatientHistoryDto> patientHistories = new ArrayList<>();

        // Fetch visits by patient ID
        List<Visit> visits = visitRepository.findByPatient_PatientIdAndAndCheckingTimeIsNotNull(patientId);

        for (Visit visit : visits) {
            PatientHistoryDto historyDto = new PatientHistoryDto();
            historyDto.setVisitId(visit.getVisitId());
            historyDto.setDoctorName("Dr. "+visit.getDoctor().getFirstName()+" "+visit.getDoctor().getLastName());
            historyDto.setPatientName(visit.getPatient().getFirstName()+" "+visit.getPatient().getLastName());
            historyDto.setVisitDate(visit.getVisitDate());
            historyDto.setHospitalName(visit.getHospital().getName());
            historyDto.setReason(visit.getReason());
            historyDto.setTests(visit.getTests());

            if(visit.getMedicalHistory()!=null){
                MedicalHistory medicalHistory = visit.getMedicalHistory();
                historyDto.setDiagnosis(medicalHistory.getDiagnosis());
                historyDto.setSymptoms(medicalHistory.getSymptoms());
                historyDto.setFamilyHistory(medicalHistory.getFamilyHistory());
                historyDto.setHeight(medicalHistory.getHeight());
                historyDto.setAllergies(medicalHistory.getAllergies());
                historyDto.setDiagnosis(medicalHistory.getDiagnosis());
                historyDto.setImmunizations(medicalHistory.getDiagnosis());
                historyDto.setChronicDiseases(medicalHistory.getChronicDiseases());
                historyDto.setWeight(medicalHistory.getWeight());
                historyDto.setNotes(medicalHistory.getNotes());
                historyDto.setPreviousSurgeries(medicalHistory.getPreviousSurgeries());
            }

            List<MedicationDto> medicationDtos = medicationService.getMedicationsByVisitId(visit.getVisitId());
            historyDto.setMedications(medicationDtos);

            patientHistories.add(historyDto);
        }

        return patientHistories;
    }

    @Override
    public PatientDto getPatientByUserId(Long userId) {
        Patient patient = patientRepository.findByUser_UserId(userId);
        if(patient!=null){
            PatientDto patientDto = convertToDto(patient);
            return patientDto;
        }
        else return null;

    }

    @Override
    public List<AppointmentDto> getTodaysAppointments(Long patientId) {
        List<Visit> visits = visitRepository.findAllByPatient_PatientIdAndVisitDate(patientId, new Date());
        List<AppointmentDto> dtos = visits.stream().map(visit -> {
            AppointmentDto dto = new AppointmentDto();
            dto.setVisitId(visit.getVisitId());
            dto.setDoctorName("Dr. "+visit.getDoctor().getFirstName()+" "+visit.getDoctor().getLastName());
            dto.setHospitalName(visit.getHospital().getName());
            dto.setSlNo(visit.getSlNo());
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
            int additionalTime = (visit.getSlNo() - 1) * visit.getDoctor().getMinutes();
            dto.setScheduledTime(visit.getDoctor().getStartTime().plusMinutes(additionalTime).format(timeFormatter));
            Optional<Visit> earliestUnattendedVisit = visitRepository.findFirstByDoctor_DoctorIdAndVisitDateAndArrivalTimeIsNotNullAndCheckingTimeIsNullOrderBySlNoAsc(
                    visit.getDoctor().getDoctorId(), visit.getVisitDate());
            dto.setCurrentSl(earliestUnattendedVisit.map(Visit::getSlNo).orElse(null));

            return dto;
        }).toList();
        return dtos;
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

    private PatientDto convertToDto(Patient patient) {
        PatientDto dto = new PatientDto();
        dto.setPatientId(patient.getPatientId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setEmail(patient.getEmail());
        dto.setPhone(patient.getPhone());
        dto.setDateOfBirth(patient.getDateOfBirth());
        if(patient.getUser() != null) {
            dto.setUserId(patient.getUser().getUserId());
        }

        return dto;
    }

    private Patient convertToEntity(PatientDto patientDto) {
        Patient patient = new Patient();
        patient.setFirstName(patientDto.getFirstName());
        patient.setLastName(patientDto.getLastName());
        patient.setEmail(patientDto.getEmail());
        patient.setPhone(patientDto.getPhone());
        User user = userRepository.findByUserId(patientDto.getUserId());
        patient.setUser(user);
        patient.setDateOfBirth(patientDto.getDateOfBirth());

        // Fetch and set User and Hospital entities here
        // Add other fields as needed
        return patient;
    }
}
