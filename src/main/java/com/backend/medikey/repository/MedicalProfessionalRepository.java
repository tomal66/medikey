package com.backend.medikey.repository;

import com.backend.medikey.model.MedicalProfessional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalProfessionalRepository extends JpaRepository<MedicalProfessional, Long> {

    // Find by email
    Optional<MedicalProfessional> findByEmail(String email);

    MedicalProfessional findByMpId(Long mpId);

    // Find by phone number
    Optional<MedicalProfessional> findByPhone(String phone);

    // Find by first name
    List<MedicalProfessional> findByFirstName(String firstName);

    // Find by last name
    List<MedicalProfessional> findByLastName(String lastName);

    // Find by hospital


}
