package com.backend.medikey.service;

import com.backend.medikey.model.Visit;
import com.backend.medikey.repository.VisitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class VisitServiceImpl implements VisitService {

    @Autowired
    private VisitRepository visitRepository;

    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    @Override
    public Optional<Visit> getVisitById(Long id) {
        return visitRepository.findById(id);
    }

    @Override
    public List<Visit> getVisitsByUserId(Long userId) {
        return visitRepository.findByUser_UserId(userId);
    }

    @Override
    public List<Visit> getVisitsByVisitDate(Date visitDate) {
        return visitRepository.findByVisitDate(visitDate);
    }

    @Override
    public List<Visit> getVisitsByHospital(String hospital) {
        return visitRepository.findByHospital(hospital);
    }

    @Override
    public List<Visit> getVisitsByDoctor(String doctor) {
        return visitRepository.findByDoctor(doctor);
    }

    @Override
    public Visit addVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    @Override
    public Visit updateVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    @Override
    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }

    // ... implement any other methods declared in the interface
}
