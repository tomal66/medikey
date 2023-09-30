package com.backend.medikey.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TestDto {
    private Long testsId;
    private Long patientId;
    private Date dateRecorded;
    private Long testLocationId;
    private String testType;
    private String testResults;
    private String followUpAction;
    private Long doctorReferredId;
    private String notes;
}