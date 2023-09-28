package com.backend.medikey.model;

import jakarta.persistence.*;
import java.util.Date;
import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicalHistoryId;
    @ManyToOne
    private Patient patient;
    @OneToOne(mappedBy = "medicalHistory")
    private Visit visit;
    private String diagnosis;
    private String symptoms;
    private String allergies;
    private String chronicDiseases;
    private String familyHistory;
    @Column(name = "date_recorded", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateRecorded;
    @ManyToOne
    private MedicalProfessional recordedBy;
    private String notes;
    private String immunizations;
    private String previousSurgeries;
    private String lifestyleFactors;
    private String geneticFactors;

}
