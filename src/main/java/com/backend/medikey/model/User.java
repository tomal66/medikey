package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    private String firstName;
    private String lastName;
    @NaturalId(mutable = true)
    private String email;
    @NaturalId(mutable = true)
    private String phone;
    private String password;
    private String role;
    private boolean isEnabled = false;

    //For Doctors
    private String specialization;
    @ManyToMany(mappedBy = "doctors")
    private List<Hospital> hospitals;
    @OneToMany(mappedBy = "doctor")
    private List<Visit> doctorVisits;

    //Patient
    @OneToMany(mappedBy = "patient")
    private List<Visit> patientVisits;
    @OneToMany(mappedBy = "patient")
    private List<MedicalHistory> medicalHistories;
    @OneToMany(mappedBy = "patient")
    private List<Test> tests;
    @OneToMany(mappedBy = "patient")
    private List<Medication> medications;

}
