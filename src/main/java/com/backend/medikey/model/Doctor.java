package com.backend.medikey.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.NaturalId;

import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Doctor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long doctorId;
    private String firstName;
    private String lastName;
    @NaturalId(mutable = true)
    private String email;
    @NaturalId(mutable = true)
    private String phone;
    private String department;
    private String title; // New field for the title of the doctor
    private Integer maxPatients; // New field for the maximum number of patients
    private Integer minutes;
    private String daysOfWeek; // Stores the days as a comma-separated string
    private LocalTime startTime; // Stores the start time of the doctor
    private String profileImage;
    @OneToOne
    private User user;
    @ManyToOne
    private Hospital hospital;
    @OneToMany(mappedBy = "doctor")
    private List<Visit> doctorVisits;

}
