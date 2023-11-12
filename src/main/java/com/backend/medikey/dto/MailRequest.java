package com.backend.medikey.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.services.lexruntimev2.endpoints.internal.Value;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MailRequest {
    private String name;
    private String to;
    private String from;
    private String subject;
    private String role;
    private String username;
    private String password;

    private PrescriptionData prescriptionData;

}
