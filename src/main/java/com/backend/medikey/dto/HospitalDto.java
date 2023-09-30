package com.backend.medikey.dto;

import lombok.Data;

import java.util.List;

@Data
public class HospitalDto {
    private Long hospitalId;
    private String name;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private String phoneNumber;
    private String email;
    private List<Long> doctorIds;
    private List<Long> visitIds;

    // Getters and Setters
}