package com.backend.medikey.repository;

import com.backend.medikey.model.User;
import com.backend.medikey.model.Visit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VisitRepository extends JpaRepository<Visit, Long> {

    // Find all visits by a specific user

    List<Visit> findByPatient(Optional<User> patient); //

    // Find all visits on a specific date
    List<Visit> findByVisitDate(Date visitDate);

    // Find all visits within a date range
    List<Visit> findByVisitDateBetween(Date startDate, Date endDate);

    // Find all visits to a specific hospital
    //List<Visit> findByHospital(String hospital);

    // Find all visits to a specific doctor
   // List<Visit> findByDoctor(String doctor);

    // Find all visits with a specific reason
    List<Visit> findByReason(String reason);


    // Find all visits before a specific follow-up date
    List<Visit> findByFollowUpDateBefore(Date followUpDate);

}
