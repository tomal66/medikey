package com.backend.medikey.service;

import com.backend.medikey.dto.MailRequest;
import com.backend.medikey.dto.VisitDto;
import com.backend.medikey.model.Doctor;
import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Visit;
import com.backend.medikey.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VisitServiceImpl implements VisitService {

    @Autowired
    private VisitRepository visitRepository;
    @Autowired
    private DoctorRepository doctorRepository;
    @Autowired
    private PatientRepository patientRepository;
    @Autowired
    private MedicalHistoryRepository medicalHistoryRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public List<VisitDto> getAllVisits() {
        List<Visit> visits = visitRepository.findAll();
        return visits.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public Optional<VisitDto> getVisitById(Long id) {
        Optional<Visit> visit = visitRepository.findById(id);
        return visit.map(this::convertToDto);
    }

    @Override
    public Optional<VisitDto> findByCode(String code) {
        Optional<Visit> visit = visitRepository.findByUniqueIdentifier(code);
        return visit.map(this::convertToDto);
    }

    @Override
    public List<VisitDto> getVisitsByUsername(String username) {
        List<Visit> visits = visitRepository.findByPatient_User_Username(username);
        return visits.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<VisitDto> getVisitsByVisitDate(Date visitDate) {
        List<Visit> visits = visitRepository.findByVisitDate(visitDate);
        return visits.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public List<VisitDto> getVisitsByDoctorAndVisitDate(Date visitDate, Long doctorId) {
        List<Visit> visits = visitRepository.findAllByVisitDateAndDoctor_DoctorId(visitDate, doctorId);
        return visits.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    @Override
    public VisitDto addVisit(VisitDto visitDto) throws Exception {
        // First, convert the DTO to an entity
        Visit visit = convertToEntity(visitDto);
        // Check if the doctor is available on the given date
        if (!isDoctorAvailable(visit.getDoctor().getDoctorId(), visit.getVisitDate())) {
            throw new Exception("Doctor is not available on the selected date.");
        }

        // Generate and set the UUID for the new visit
        String uniqueIdentifier = UUID.randomUUID().toString();
        visit.setUniqueIdentifier(uniqueIdentifier);

        // Calculate and set the serial number for the new visit
        Integer slNo = calculateSlNoForDoctorAndDate(visit.getDoctor(), visit.getVisitDate());
        visit.setSlNo(slNo);

        // Save the new visit with the calculated slNo
        Visit savedVisit = visitRepository.save(visit);

        //Send confirmation email
        MailRequest mailRequest = new MailRequest();
        mailRequest.setFrom("medikey.health@gmail.com");
        mailRequest.setTo(visit.getPatient().getEmail());
        mailRequest.setSubject("Appointment Confirmation");
        Map<String, Object> model = new HashMap<>();
        model.put("drName", visit.getDoctor().getFirstName().trim()+" "+visit.getDoctor().getLastName().trim());
        model.put("patientName", visit.getPatient().getFirstName().trim());
        model.put("title", visit.getDoctor().getTitle());
        model.put("hospitalName", visit.getHospital().getName());
        model.put("city", visit.getHospital().getCity().trim());
        model.put("country", visit.getHospital().getCountry().trim());
        SimpleDateFormat dateFormat = new SimpleDateFormat("EEEE, MMM dd, yyyy");
        model.put("date", dateFormat.format(visit.getVisitDate()));
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("h:mm a");
        model.put("startTime", visit.getDoctor().getStartTime().format(timeFormatter));
        int additionalTime = (visit.getSlNo() - 1) * visit.getDoctor().getMinutes();
        model.put("time", visit.getDoctor().getStartTime().plusMinutes(additionalTime).format(timeFormatter));
        model.put("serial", visit.getSlNo());
        model.put("call", visit.getHospital().getPhoneNumber());

        emailService.sendEmail(mailRequest, model, visit.getUniqueIdentifier());

        return convertToDto(savedVisit);
    }


    @Override
    public VisitDto updateVisit(VisitDto visitDto) {
        Visit visit = convertToEntity(visitDto);
        Visit updatedVisit = visitRepository.save(visit);
        return convertToDto(updatedVisit);
    }

    @Override
    public void linkMedicalHistory(Long medicalHistoryId, Long visitId) {
        Visit visit = visitRepository.findByVisitId(visitId);
        VisitDto visitDto = convertToDto(visit);
        visitDto.setMedicalHistoryId(medicalHistoryId);
        updateVisit(visitDto);
    }

    @Override
    public boolean isDoctorAvailable(Long doctorId, Date date) {
        int existingVisits = visitRepository.countByDoctor_DoctorIdAndVisitDate(doctorId, date);
        return existingVisits < doctorRepository.findByDoctorId(doctorId).getMaxPatients();
    }

    @Override
    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }

    private Integer calculateSlNoForDoctorAndDate(Doctor doctor, Date visitDate) {
        // Assuming visitDate is already the start of the day
        Integer lastSlNo = visitRepository.findMaxSlNoByDoctorAndDate(doctor.getDoctorId(), visitDate);
        return (lastSlNo == null ? 0 : lastSlNo) + 1;
    }

    private Visit convertToEntity(VisitDto dto) {
        Visit visit = new Visit();

        if (dto.getVisitId() != null) {
            visit.setVisitId(dto.getVisitId());
        }
        if (dto.getDoctorId() != null) {
            visit.setDoctor(doctorRepository.findByDoctorId(dto.getDoctorId()));
        }
        if (dto.getPatientId() != null) {
            visit.setPatient(patientRepository.findByPatientId(dto.getPatientId()));
        }

        if (dto.getMedicalHistoryId() != null) {
            visit.setMedicalHistory(medicalHistoryRepository.findByMedicalHistoryId(dto.getMedicalHistoryId()));
        }

        visit.setHospital(visit.getDoctor().getHospital());

        if (dto.getVisitDate() != null) {
            visit.setVisitDate(dto.getVisitDate());
        }
        if (dto.getArrivalTime() != null) {
            visit.setArrivalTime(dto.getArrivalTime());
        }
        if (dto.getCheckingTime() != null) {
            visit.setCheckingTime(dto.getCheckingTime());
        }
        if (dto.getReason() != null) {
            visit.setReason(dto.getReason());
        }
        if (dto.getTests() != null) {
            visit.setTests(dto.getTests());
        }
        if (dto.getFollowUpDate() != null) {
            visit.setFollowUpDate(dto.getFollowUpDate());
        }
        if (dto.getSlNo() != null) {
            visit.setSlNo(dto.getSlNo());
        }
        // Medications are handled based on the visit, which could be a new entity without an ID yet
        if (visit.getVisitId() != null) {
            List<Medication> medications = medicationRepository.findByVisit(visit);
            visit.setMedications(medications);
        }

        return visit;
    }


    private VisitDto convertToDto(Visit entity) {
        VisitDto dto = new VisitDto();
        if(entity.getVisitId()!=null) {
            dto.setVisitId(entity.getVisitId());
        }
        dto.setDoctorId(entity.getDoctor().getDoctorId());
        dto.setPatientId(entity.getPatient().getPatientId());
        dto.setPatientName(entity.getPatient().getFirstName() + " " + entity.getPatient().getLastName());
        if(entity.getMedicalHistory()!=null) {
            dto.setMedicalHistoryId(entity.getMedicalHistory().getMedicalHistoryId());
        }
        dto.setHospitalId(entity.getHospital().getHospitalId());
        dto.setVisitDate(entity.getVisitDate());
        if(entity.getArrivalTime()!=null) {
            dto.setArrivalTime(entity.getArrivalTime());
        }
        if(entity.getCheckingTime()!=null) {
            dto.setCheckingTime(entity.getCheckingTime());
        }
        dto.setReason(entity.getReason());
        if(entity.getTests()!=null) {
            dto.setTests(entity.getTests());
        }
        if(entity.getFollowUpDate()!=null) {
            dto.setFollowUpDate(entity.getFollowUpDate());
        }
        dto.setSlNo(entity.getSlNo());
        dto.setUniqueIdentifier(entity.getUniqueIdentifier());
        return dto;
    }

    // ... implement any other methods declared in the interface
}
