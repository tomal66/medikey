package com.backend.medikey.service;

import com.backend.medikey.model.User;
import com.backend.medikey.model.Visit;
import com.backend.medikey.repository.UserRepository;
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


    private UserRepository userRepository;

    @Override
    public List<Visit> getAllVisits() {
        return visitRepository.findAll();
    }

    @Override
    public Optional<Visit> getVisitById(Long id) {
        return visitRepository.findById(id);
    }

    @Override
    public List<Visit> getVisitsByUsername(String username) {
        return visitRepository.findByPatient_User_Username(username); // 200 OK, body contains list of visits
    }

    @Override
    public List<Visit> getVisitsByVisitDate(Date visitDate) {
        return visitRepository.findByVisitDate(visitDate);
    }

    // @Override
    //public List<Visit> getVisitsByHospital(String hospital) {
    //    return visitRepository.findByHospital(hospital);
   // }

    //@Override
   // public List<Visit> getVisitsByDoctor(String doctor) {
        //Optional<User> doctor = userRepository.findUserByUserId(userId);
   //     return visitRepository.findByDoctor(doctor);
  //  }

    @Override
    public Visit addVisit(Visit visit) throws Exception {
        int existingVisits = visitRepository.countByDoctor_DoctorIdAndVisitDate(visit.getDoctor().getDoctorId(), visit.getVisitDate());
        if (existingVisits >= 30) {
            throw new Exception("Doctor has reached the maximum number of visits for this day.");
        }
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
