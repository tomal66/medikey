package com.backend.medikey.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hospitalId;

    private String name;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    private String phoneNumber;

    private String email;

    // Other attributes related to the hospital can be added here
    @ManyToMany
    private List<User> doctors;
    @OneToMany(mappedBy = "hospital")
    private List<Visit> visits;

}
