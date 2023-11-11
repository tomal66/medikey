package com.backend.medikey.service;

import com.backend.medikey.dto.MedicalHistoryDto;
import com.backend.medikey.dto.VisitDto;
import com.backend.medikey.model.Visit;

import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface VisitService {

    List<VisitDto> getAllVisits();

    Optional<VisitDto> getVisitById(Long id);


    List<VisitDto> getVisitsByUsername(String username);

    List<VisitDto> getVisitsByVisitDate(Date visitDate);

    List<VisitDto> getVisitsByDoctorAndVisitDate(Date visitDate, Long doctorId);

    Optional<VisitDto> findByCode(String code);

    VisitDto addVisit(VisitDto visitDto) throws Exception;

    VisitDto updateVisit(VisitDto visitDto);

    void linkMedicalHistory(Long medicalHistoryId, Long visitId);

    boolean isDoctorAvailable(Long doctorId, Date date);

    void deleteVisit(Long id);



}
