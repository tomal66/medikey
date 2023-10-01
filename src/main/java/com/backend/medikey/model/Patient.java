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
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long patientId;
    private String firstName;
    private String lastName;
    @NaturalId(mutable = true)
    private String email;
    @NaturalId(mutable = true)
    private String phone;
    @OneToOne
    private User user;
    @OneToOne
    private Hospital hospital;
    @OneToMany(mappedBy = "patient")
    private List<Visit> patientVisits;
    @OneToMany(mappedBy = "patient")
    private List<MedicalHistory> medicalHistories;
    @OneToMany(mappedBy = "patient")
    private List<Test> tests;
    @OneToMany(mappedBy = "patient")
    private List<Medication> medications;

    public Patient(Long patientId) {
        this.patientId = patientId;
    }
}

