package com.backend.medikey.repository;

import com.backend.medikey.model.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

    List<MedicalHistory> findByUser_UserId(Long userId);

    List<MedicalHistory> findByDiagnosisContainingIgnoreCase(String diagnosis);

    List<MedicalHistory> findBySymptomsContainingIgnoreCase(String symptoms);

    List<MedicalHistory> findByAllergiesContainingIgnoreCase(String allergies);

    List<MedicalHistory> findByChronicDiseasesContainingIgnoreCase(String chronicDiseases);

    List<MedicalHistory> findByFamilyHistoryContainingIgnoreCase(String familyHistory);

    List<MedicalHistory> findByDateRecorded(Date dateRecorded);

    List<MedicalHistory> findByRecordedBy(String recordedBy);

    List<MedicalHistory> findByImmunizationsContainingIgnoreCase(String immunizations);

    List<MedicalHistory> findByPreviousSurgeriesContainingIgnoreCase(String previousSurgeries);

    List<MedicalHistory> findByLifestyleFactorsContainingIgnoreCase(String lifestyleFactors);

    List<MedicalHistory> findByGeneticFactorsContainingIgnoreCase(String geneticFactors);

    // Custom query to search for medical history records based on notes
    @Query("SELECT mh FROM MedicalHistory mh WHERE mh.notes LIKE %?1%")
    List<MedicalHistory> findByNotesContaining(String notesDetail);

}
