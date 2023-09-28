package com.backend.medikey.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String password;
    private String role;
}
