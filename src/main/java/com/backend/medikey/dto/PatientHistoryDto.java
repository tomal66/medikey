package com.backend.medikey.dto;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PatientHistoryDto {
    private Long visitId;
    private String doctorName;
    private String patientName;
    private String diagnosis;
    private String symptoms;
    private String allergies;
    private String chronicDiseases;
    private String familyHistory;
    private String notes;
    private String immunizations;
    private String previousSurgeries;
    private String height;
    private String weight;
    private Date visitDate;
    private String hospitalName;
    private String reason;
    private String tests;
    private List<MedicationDto> medications;
}
