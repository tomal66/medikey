package com.backend.medikey.repository;

import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import com.backend.medikey.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    Visit findByVisitId(Long visitId);

    // Find all visits by a specific user

    List<Visit> findByPatient(Patient patient); //


    // Find all visits on a specific date
    List<Visit> findByVisitDate(Date visitDate);

    // Find all visits within a date range
    List<Visit> findByVisitDateBetween(Date startDate, Date endDate);

    List<Visit> findAllByVisitDateAndDoctor_DoctorId(Date visitDate, Long doctorId);
    Optional<Visit> findByUniqueIdentifier(String uniqueIdentifier);

    // Find visits by the username of the User associated with the Patient
    List<Visit> findByPatient_User_Username(String username);

    // Find visits by the patientId of the Patient
    List<Visit> findByPatient_PatientId(Long patientId);
    List<Visit> findByPatient_PatientIdAndAndCheckingTimeIsNotNull(Long patientId);
    List<Visit> findAllByPatient_PatientIdAndVisitDate(Long patientId, Date visitDate);
    Optional<Visit> findFirstByDoctor_DoctorIdAndVisitDateAndArrivalTimeIsNotNullAndCheckingTimeIsNullOrderBySlNoAsc(Long doctorId, Date visitDate);

    // Find all visits before a specific follow-up date
    List<Visit> findByFollowUpDateBefore(Date followUpDate);
    int countByDoctor_DoctorIdAndVisitDate(Long doctorId, Date visitDate);
    @Query("SELECT MAX(v.slNo) FROM Visit v WHERE v.doctor.doctorId = :doctorId AND v.visitDate = :visitDate")
    Integer findMaxSlNoByDoctorAndDate(@Param("doctorId") Long doctorId, @Param("visitDate") Date visitDate);


}
