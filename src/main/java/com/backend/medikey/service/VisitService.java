package com.backend.medikey.service;

import com.backend.medikey.model.Visit;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VisitService {

    List<Visit> getAllVisits();

    Optional<Visit> getVisitById(Long id);

    //List<Visit> getVisitsByUserId(Long userId);

    List<Visit> getVisitsByUsername(String username);

    List<Visit> getVisitsByVisitDate(Date visitDate);

    //List<Visit> getVisitsByHospital(String hospital);

    //List<Visit> getVisitsByDoctor(String doctor); getting errors related findByDoctor method
//
    Visit addVisit(Visit visit) throws Exception;

    Visit updateVisit(Visit visit);

    void deleteVisit(Long id);



}
