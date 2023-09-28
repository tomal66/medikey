package com.backend.medikey.dto;

import lombok.Data;

import java.util.Date;

@Data
public class MedicationDto {
    private Long medicationId;
    private Long patientId;
    private Long prescribedById;
    private Long visitId;
    private Date datePrescribed;
    private String medicationName;
    private String dosage;
    private String frequency;
    private String duration;
    private String status;
    private String sideEffects;
    private String notes;
}
