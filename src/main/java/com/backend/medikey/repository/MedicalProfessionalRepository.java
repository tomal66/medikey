package com.backend.medikey.repository;

import com.backend.medikey.model.MedicalProfessional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalProfessionalRepository extends JpaRepository<MedicalProfessional, Long> {

    MedicalProfessional findByMpId(Long mpId);
    MedicalProfessional findByUser_UserId(Long userId);
    List<MedicalProfessional> findAllByHospital_HospitalId(Long hospitalId);

}
