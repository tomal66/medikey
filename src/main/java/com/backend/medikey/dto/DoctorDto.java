package com.backend.medikey.dto;

import lombok.Data;

import java.util.List;

@Data
public class DoctorDto {
    private Long doctorId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String department;
    private Long userId;
    private Long hospitalId;
    private List<Long> doctorVisitIds;


    // Getters and Setters
}
