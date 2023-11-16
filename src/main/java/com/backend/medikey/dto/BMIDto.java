package com.backend.medikey.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BMIDto {
    Double bmi;
    Double height;
    Double weight;
    Date date;
}
