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
    @Column(unique = true)
    private String username;
    private String password;
    private String role;

    @OneToOne(mappedBy = "user")
    private Doctor doctor;

    @OneToOne(mappedBy = "user")
    private MedicalProfessional medicalProfessional;

    @OneToOne(mappedBy = "user")
    private Hospital hospital;

    @OneToOne(mappedBy = "user")
    private Patient patient;


    //Ektu confused ei implementation niye
    //public User(Long userId) {
       // this.userId = userId;
    //}
}
