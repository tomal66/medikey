package com.backend.medikey.repository;

import com.backend.medikey.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    // Find all visits by a specific user
    List<Visit> findByUser_UserId(Long userId);

    // Find all visits on a specific date
    List<Visit> findByVisitDate(Date visitDate);

    // Find all visits within a date range
    List<Visit> findByVisitDateBetween(Date startDate, Date endDate);

    // Find all visits to a specific hospital
    List<Visit> findByHospital(String hospital);

    // Find all visits to a specific doctor
    List<Visit> findByDoctor(String doctor);

    // Find all visits where a specific doctor took the history
    List<Visit> findByHistoryTakenBy(String historyTakenBy);

    // Find all visits with a specific reason
    List<Visit> findByReason(String reason);

    // Custom query to find visits based on prescription details
    @Query("SELECT v FROM Visit v WHERE v.prescription LIKE %?1%")
    List<Visit> findByPrescriptionContaining(String prescriptionDetail);

    // Find all visits before a specific follow-up date
    List<Visit> findByFollowUpDateBefore(Date followUpDate);

}
