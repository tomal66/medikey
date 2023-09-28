package com.backend.medikey.dto;

import lombok.Data;

@Data
public class UserDto {
    private Long userId;
    private String username;
    private String role;
    private Long doctorId;
    private Long medicalProfessionalId;
    private Long hospitalId;
    private Long patientId;
}
