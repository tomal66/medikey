package com.backend.medikey.dto;

import lombok.Data;

import java.util.List;

@Data
public class PatientDto {
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Long userId;
    private Long hospitalId;
    private List<Long> patientVisitIds;
    private List<Long> medicalHistoryIds;
    private List<Long> testIds;
    private List<Long> medicationIds;
}
