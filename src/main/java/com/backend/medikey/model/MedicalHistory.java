package com.backend.medikey.model;

import jakarta.persistence.*;
import java.util.Date;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "medical_history")
public class MedicalHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medical_history_Id;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    @Column(name = "diagnosis")
    private String diagnosis;

    @Column(name = "symptoms")
    private String symptoms;

    @Column(name = "allergies")
    private String allergies;

    @Column(name = "chronic_diseases")
    private String chronicDiseases;

    @Column(name = "family_history")
    private String familyHistory;

    @Column(name = "date_recorded", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateRecorded;

    @Column(name = "Recorded_by", nullable = false)
    private String recordedBy;

    @Column(name = "notes")
    private String notes;

    @Column(name = "immunizations")
    private String immunizations;

    @Column(name = "previous_surgeries")
    private String previousSurgeries;

    @Column(name = "lifestyle_factors")
    private String lifestyleFactors;

    @Column(name = "genetic_factors")
    private String geneticFactors;

    @Column(name = "attachments")
    private String attachments;

    // Getters and setters
}
