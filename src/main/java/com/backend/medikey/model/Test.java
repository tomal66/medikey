package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.print.Doc;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long testsId;
    @ManyToOne
    private Patient patient;
    @Column(name = "date_recorded", nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dateRecorded; // date of test
    @ManyToOne
    private Hospital testLocation; // hospital or clinic
    private String testType; // blood test, urine test, etc
    private String testResults;
    private String followUpAction; // medication, surgery, etc
    @ManyToOne
    private Doctor doctorReferred; // test referenced by doctor or hospital
    private String notes;
    private String testReport;
}
