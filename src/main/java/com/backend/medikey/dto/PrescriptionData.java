package com.backend.medikey.dto;

import lombok.Data;

import java.util.List;

@Data
public class PrescriptionData {
    private Long doctorId;
    private Long patientId;
    private String patientName;
    private String date;
    private String reason;
    private String symptoms;
    private String diagnosis;
    private String followUpDate;
    private String note;
    private String tests;
    private List<MedicationDto> medications;

}
