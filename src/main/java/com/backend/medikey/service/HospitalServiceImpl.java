package com.backend.medikey.service;

import com.backend.medikey.model.Hospital;
import com.backend.medikey.repository.HospitalRepository;
import com.backend.medikey.service.HospitalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HospitalServiceImpl implements HospitalService {

    @Autowired
    private HospitalRepository hospitalRepository;

    @Override
    public Hospital save(Hospital hospital) {
        return hospitalRepository.save(hospital);
    }

    @Override
    public List<Hospital> findAll() {
        return hospitalRepository.findAll();
    }

    @Override
    public Optional<Hospital> findById(Long id) {
        return hospitalRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        hospitalRepository.deleteById(id);
    }

    @Override
    public List<Hospital> findByName(String name) {
        return hospitalRepository.findByName(name);
    }

    @Override
    public List<Hospital> findByCity(String city) {
        return hospitalRepository.findByCity(city);
    }

    @Override
    public List<Hospital> findByState(String state) {
        return hospitalRepository.findByState(state);
    }

    @Override
    public List<Hospital> findByCountry(String country) {
        return hospitalRepository.findByCountry(country);
    }

    @Override
    public List<Hospital> findByPostalCode(String postalCode) {
        return hospitalRepository.findByPostalCode(postalCode);
    }
}