package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "medications")
@Getter
@Setter
public class Medications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long medicationId;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    @Column(name = "date_prescribed", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date datePrescribed;

    @Column(name = "medication_name", nullable = false)
    private String medicationName;

    @Column(name = "dosage", nullable = false)
    private String dosage;

    @Column(name = "frequency", nullable = false)
    private String frequency;
    //How many times medication taken a day

    @Column(name = "duration", nullable = false)
    private String duration;
    //How many days medication taken

    @Column(name = "prescribed_by", nullable = false)
    private String prescribedBy;
    //Doctor who prescribed medication or hospital

    @Column(name = "status")
    private String status; // Active, Completed, Discontinued

    @Column(name = "side_effects")
    private String sideEffects;

    @Column(name = "notes", length = 2000)
    private String notes;
    // Additional fields as needed
}
