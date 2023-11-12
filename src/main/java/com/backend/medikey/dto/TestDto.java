package com.backend.medikey.dto;

import lombok.Data;

import java.util.Date;

@Data
public class TestDto {
    private Long testId;
    private Long patientId;
    private Date dateRecorded;
    private Long testLocationId;
    private String testType;
    private String doctorName;
    private String testReport;
}