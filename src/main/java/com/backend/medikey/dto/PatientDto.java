package com.backend.medikey.dto;

import com.backend.medikey.model.User;
import jakarta.persistence.Entity;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
public class PatientDto {
    private Long patientId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private Long userId;
    private Date dateOfBirth;
    private List<Long> patientVisitIds;
    private List<Long> medicalHistoryIds;
    private List<Long> testIds;
    private List<Long> medicationIds;
}
