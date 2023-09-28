package com.backend.medikey.dto;

import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
public class TimeSlotDto {
    private Long timeSlotId;
    private Long doctorId;
    private Long hospitalId;
    private DayOfWeek day;
    private LocalTime startTime;
    private LocalTime endTime;
    private Integer duration;
}
