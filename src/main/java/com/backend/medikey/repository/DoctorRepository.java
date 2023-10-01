package com.backend.medikey.repository;

import com.backend.medikey.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // Find by email
    Optional<Doctor> findByEmail(String email);

    // Find by phone number
    Optional<Doctor> findByPhone(String phone);

    // Find by first name
    List<Doctor> findByFirstName(String firstName);

    // Find by last name
    List<Doctor> findByLastName(String lastName);

    // Find by department
    List<Doctor> findByDepartment(String department);

    // Find by hospital ID
    List<Doctor> findByHospitalId(Long hospitalId);

    // Find by user ID
    Optional<Doctor> findByUserId(Long userId);

    Doctor findByDoctorId(Long doctorId);
}
