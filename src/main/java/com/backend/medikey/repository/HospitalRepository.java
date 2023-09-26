package com.backend.medikey.repository;

import com.backend.medikey.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, Long> {

    // Find hospitals by name
    List<Hospital> findByName(String name);

    // Find hospitals by city
    List<Hospital> findByCity(String city);

    // Find hospitals by state
    List<Hospital> findByState(String state);

    // Find hospitals by country
    List<Hospital> findByCountry(String country);

    // Find hospitals by postal code
    List<Hospital> findByPostalCode(String postalCode);

}
