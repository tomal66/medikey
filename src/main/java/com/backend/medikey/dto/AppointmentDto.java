package com.backend.medikey.dto;

import lombok.Data;

import java.time.LocalTime;
import java.util.Date;

@Data
public class AppointmentDto {
    Long visitId;
    String doctorName;
    String hospitalName;
    Integer slNo;
    String scheduledTime;
    Integer currentSl;

}
