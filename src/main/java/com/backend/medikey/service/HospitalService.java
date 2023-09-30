package com.backend.medikey.service;

import com.backend.medikey.model.Hospital;

import java.util.List;
import java.util.Optional;

public interface HospitalService {

    // Basic CRUD operations
    Hospital save(Hospital hospital);
    List<Hospital> findAll();
    Hospital findByHospitalId(Long hospitalId);
    void delete(Long id);

    // Custom query methods
    List<Hospital> findByName(String name);
    List<Hospital> findByCity(String city);
    List<Hospital> findByState(String state);
    List<Hospital> findByCountry(String country);
    List<Hospital> findByPostalCode(String postalCode);
}