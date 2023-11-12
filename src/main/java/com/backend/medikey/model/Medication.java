package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Medication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicationId;
    @ManyToOne
    private Patient patient;
    @ManyToOne
    private Doctor prescribedBy;
    @ManyToOne
    private Visit visit;
    @Column(name = "date_prescribed", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date datePrescribed;
    @Column(name = "medication_name", nullable = false)
    private String medicationName;
    @Column(name = "dosage", nullable = false)
    private String dosage;
    @Column(name = "frequency", nullable = false)
    private String frequency;
    @Column(name = "duration", nullable = false)
    private String duration;
    @Column(name = "status")
    private String status; // Active, Completed, Discontinued

}
