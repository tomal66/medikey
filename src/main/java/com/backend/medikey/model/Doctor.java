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
    @OneToOne
    private Hospital hospital;
    @OneToMany(mappedBy = "doctor")
    private List<Visit> doctorVisits;

    //Ektu confused
    public void setUserId(Long userId) {
        this.user = new User(userId);
    }

    public void setHospitalId(Long hospitalId) {
        this.hospital = new Hospital(hospitalId);
    }

    public void setDoctorVisitIds(List<Long> doctorVisitIds) {
        for (Long visitId : doctorVisitIds) {
            this.doctorVisits.add(new Visit(visitId));
        }
    }
}
