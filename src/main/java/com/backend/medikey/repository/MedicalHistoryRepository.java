package com.backend.medikey.repository;

import com.backend.medikey.model.MedicalHistory;
import com.backend.medikey.model.Medication;
import com.backend.medikey.model.Patient;
import com.backend.medikey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

    List<MedicalHistory> findByPatient_PatientId(Long patientId);
    @Query("SELECT mh FROM MedicalHistory mh WHERE mh.notes LIKE %?1%")
    List<MedicalHistory> findByNotesContaining(String notesDetail);

    List<MedicalHistory> findAllByPatient_PatientId(Long patientId);
    MedicalHistory findByMedicalHistoryId(Long medicalHistoryId);

}
