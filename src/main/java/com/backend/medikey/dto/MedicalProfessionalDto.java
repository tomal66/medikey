package com.backend.medikey.dto;

import lombok.Data;

import java.util.List;

@Data
public class MedicalProfessionalDto {
    private Long mpId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Long userId;
    private Long hospitalId;

}
