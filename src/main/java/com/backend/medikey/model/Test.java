package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "test")
@Getter
@Setter
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testsId;

    @OneToOne
    @JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

    @Column(name = "date_recorded", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateRecorded; // date of test

    @Column(name = "test_location", nullable = false)
    private String testLocation; // hospital or clinic

    @Column(name = "test_type", nullable = false)
    private String testType; // blood test, urine test, etc

    @Column(name = "test_results", nullable = false)
    private String testResults;

    @Column(name = "follow_up_action", nullable = false)
    private String followUpAction; // medication, surgery, etc

    @Column(name = "test_reference", nullable = false)
    private String testReference; // test referenced by doctor or hospital

    @Column(name = "cost", nullable = false)
    private Double cost;
    @Column(name = "notes", length = 2000)
    private String notes;
}
