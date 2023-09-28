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
public class MedicalProfessional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mpId;
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

    @OneToMany(mappedBy = "medicalProfessional")
    private List<MedicalHistory> takenHistories;
}
