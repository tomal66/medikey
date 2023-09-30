package com.backend.medikey.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class VisitDto {
    private Long visitId;
    private Long doctorId;
    private Long patientId;
    private Long medicalHistoryId;
    private List<Long> medicationIds;
    private Date visitDate;
    private Date arrivalTime;
    private Date checkingTime;
    private Long hospitalId;
    private String reason;
    private String tests;
    private Date followUpDate;
}