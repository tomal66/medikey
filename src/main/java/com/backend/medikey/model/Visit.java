package com.backend.medikey.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

import lombok.*;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitId;
    @ManyToOne
    private Doctor doctor;
    @ManyToOne
    private Patient patient;
    @OneToOne
    private MedicalHistory medicalHistory;
    @OneToMany(mappedBy = "visit")
    private List<Medication> medications;
    @Column(name = "visit_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date visitDate;
    @Column(name = "arrival_time")
    @Temporal(TemporalType.TIME)
    private Date arrivalTime;
    @Column(name = "checking_time")
    @Temporal(TemporalType.TIME)
    private Date checkingTime;
    @ManyToOne
    private Hospital hospital;
    @Column(name = "reason", nullable = false)
    private String reason;
    private String tests;
    @Column(name = "follow_up_date")
    @Temporal(TemporalType.DATE)
    private Date followUpDate;

}
