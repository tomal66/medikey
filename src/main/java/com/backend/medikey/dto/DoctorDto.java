package com.backend.medikey.dto;

import lombok.Data;
import java.time.LocalTime;

@Data
public class DoctorDto {
    private Long doctorId;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String department;
    private String title; // New field for the doctor's title
    private Integer maxPatients; // New field for the maximum number of patients
    private Integer minutes;
    private String daysOfWeek; // New field for the days of the week
    private LocalTime startTime; // New field for the start time
    private Long userId;
    private Long hospitalId;
    private String profileImage;

}
