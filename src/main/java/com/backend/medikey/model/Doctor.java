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
    @OneToOne
    private User user;
    @ManyToOne
    private Hospital hospital;
    @OneToMany(mappedBy = "doctor")
    private List<Visit> doctorVisits;

    @OneToMany(mappedBy = "doctor")
    private List<TimeSlot> timeSlots;

}
