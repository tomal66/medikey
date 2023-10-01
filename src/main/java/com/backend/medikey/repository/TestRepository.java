package com.backend.medikey.repository;

import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.Test;
import com.backend.medikey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<Test, Long> {
    void deleteById(Long testId);

    List<Test> findByPatient(Patient patient);

    Optional<Test> findById(Long testId);

    Test save(Test testToUpdate);

    @Query("SELECT t FROM Test t JOIN t.patient p JOIN p.user u WHERE u.username = :username")
    List<Test> findTestsByUsername(@Param("username") String username);
}
