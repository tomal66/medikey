package com.backend.medikey.dto;

import lombok.Data;

@Data
public class ChangePasswordDto {
    private String username;
    private String currentPassword;
    private String newPassword;
}
