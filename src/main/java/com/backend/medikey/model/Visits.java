package com.backend.medikey.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "visits")
public class Visits {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long visitId;

    @Column(name = "visit_date", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date visitDate;

    @Column(name = "arrival_time", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date arrivalTime;

    @Column(name = "checking_time", nullable = false)
    @Temporal(TemporalType.TIME)
    private Date checkingTime;

    @Column(name = "history_taken_by", nullable = false)
    private String historyTakenBy;

    @Column(name = "hospital", nullable = false)
    private String hospital;

    @Column(name = "doctor", nullable = false)
    private String doctor;

    @Column(name = "reason", nullable = false)
    private String reason;

    // Additional fields
    @Column(name = "prescription")
    private String prescription;

    @Column(name = "follow_up_date")
    @Temporal(TemporalType.DATE)
    private Date followUpDate;

    // Getters and Setters
}
