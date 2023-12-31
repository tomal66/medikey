package com.backend.medikey.dto;

import com.backend.medikey.model.MedicalProfessional;
import lombok.Data;

import java.util.Date;

@Data
public class MedicalHistoryDto {
    private Long medicalHistoryId;
    private Long patientId;
    private Long visitId;
    private String diagnosis;
    private String symptoms;
    private String allergies;
    private String chronicDiseases;
    private String familyHistory;
    private Long recordedByMPId;
    private String notes;
    private String immunizations;
    private String previousSurgeries;
    private String height;
    private String weight;

}